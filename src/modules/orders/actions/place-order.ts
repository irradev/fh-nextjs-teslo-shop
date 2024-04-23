import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import type { CheckoutAddress } from '@/modules/checkout/interfaces';
import type { Size } from '@/modules/products/interfaces';

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: CheckoutAddress
) => {
  const session = await auth();
  const userId = session?.user.id;

  // Verificar sesión de usuario
  if (!userId) {
    return {
      ok: false,
      message: 'No hay sessión de usuario.',
    };
  }

  // Obtener la información de los productos
  // Nota: recordar que podemos llevar 2+ productos con el mismo ID
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((p) => p.productId),
      },
    },
  });

  // Calcular montos // Encabezado
  const itemsInOrder = productIds.reduce((count, p) => {
    return count + p.quantity;
  }, 0);

  // Los totales de tax, subtotal y total
  const { subTotal, tax, total } = productIds.reduce(
    (totals, p) => {
      const productQuantity = p.quantity;
      const product = products.find((product) => product.id === p.productId);

      if (!product) throw new Error(`${p.productId} no existe.`);

      const subTotal = productQuantity * product.price;
      const tax = subTotal * 0.15;
      const total = subTotal + tax;

      return {
        subTotal: totals.subTotal + subTotal,
        tax: totals.tax + tax,
        total: totals.total + total,
      };

      // totals.subTotal += subTotal;
      // totals.tax += subTotal * 0.15;
      // totals.total += subTotal * 1.15;

      // return totals;
    },
    { subTotal: 0, tax: 0, total: 0 }
  );

  try {
    // Crear la transacción de base de datos
    const prismaTx = await prisma.$transaction(async (tx) => {
      // 1. Actualizar el stock de los productos
      const updatedProductsPromises = products.map((product) => {
        // 1.1. Acumular la cantidad de cada producto
        const productQuantity = productIds
          .filter((p) => p.productId === product.id)
          .reduce((count, p) => {
            return count + p.quantity;
          }, 0);

        if (productQuantity === 0) {
          throw new Error(
            `El producto ${product.title} no tiene cantidad definida.`
          );
        }

        return tx.product.update({
          where: {
            id: product.id,
          },
          data: {
            inStock: {
              decrement: productQuantity,
            },
            // inStock: product.inStock - productQuantity, <-- No hacer esto
          },
        });
      });

      const txUpdatedProducts = await Promise.all(updatedProductsPromises);

      // 1.2. Verificar valores negativos en las existencias = no hay stock
      txUpdatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(
            `El producto ${product.title} no tiene suficiente inventario.`
          );
        }
      });

      // 2. Crear la orden - Encabezado - Detalles
      let isNotValidPrice = false;
      const txOrder = await tx.order.create({
        data: {
          userId,
          subTotal,
          tax,
          total,
          itemsInOrder,

          OrderItem: {
            createMany: {
              data: productIds.map((p) => {
                const price =
                  products.find((product) => product.id === p.productId)
                    ?.price || 0;

                if (price === 0) {
                  isNotValidPrice = true;
                }

                return {
                  quantity: p.quantity,
                  size: p.size,
                  productId: p.productId,
                  price,
                };
              }),
            },
          },
        },
      });

      // 2.1. Validar si el price es 0, entonces lanzar un error
      if (isNotValidPrice) {
        throw new Error('Uno de los productos no tiene precio');

        // return new Promise((resolve, reject) => {
        //   reject(new Error('TX: Uno de los productos no tiene precio'));
        // });
      }

      // 3. Crear la dirección de la orden
      const { id, name, zipCode, country, rememberAddress, ...rest } = address;
      const countryDB = await tx.country.findUnique({
        where: {
          name: country,
        },
      });

      // 3.1. Validar que el país exista
      if (!countryDB) {
        throw new Error('País no encontrado');
      }

      const txAddress = await tx.orderAddress.create({
        data: {
          ...rest,
          firstName: address.name,
          postalCode: zipCode,
          countryId: countryDB.id,
          orderId: txOrder.id,
        },
      });

      return {
        order: txOrder,
        address: txAddress,
        updatedProducts: txUpdatedProducts,
      };
    });

    return {
      ok: true,
      message: 'Orden creada correctamente.',
      order: prismaTx.order,
      address: prismaTx.address,
      updatedProducts: prismaTx.updatedProducts,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: (error as any).message as string,
    };
  }
};
