import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getOrderById = async (orderId: string) => {
  try {
    const session = await auth();

    if (!session?.user) {
      return {
        ok: false,
        message: 'Debe estar autenticado.',
        orderInfo: null,
      };
    }

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        OrderAddress: {
          include: {
            country: {
              select: {
                name: true,
              },
            },
          },
        },
        OrderItem: {
          include: {
            product: {
              select: {
                title: true,
                slug: true,
                ProductImage: {
                  take: 1,
                  select: {
                    url: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return {
      ok: true,
      message: 'Orden obtenida',
      orderInfo: order,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo obtener la orden.',
      orderInfo: null,
    };
  }
};
