import prisma from '@/lib/prisma';
import { PaypalOrderStatusResponse } from '../../interfaces';
import { revalidatePath } from 'next/cache';

export const paypalCheckPayment = async (paypalTransactionId: string) => {
  console.log('paypalTransactionId', paypalTransactionId);
  const authToken = await getPayPalBearerToken();

  if (!authToken) {
    return {
      ok: false,
      message: 'No se pudo obtener el token de autorización',
    };
  }

  const orderStatus = await verifyPayPalPayment(paypalTransactionId, authToken);

  if (!orderStatus) {
    return {
      ok: false,
      message: 'No se pudo verificar el pago de la orden',
    };
  }

  const { status, purchase_units } = orderStatus;
  const { invoice_id: orderId } = purchase_units[0];

  if (status !== 'COMPLETED') {
    return {
      ok: false,
      message: 'La orden no se ha pagado en paypal',
    };
  }

  // Actualizar nuestra base de datos para marcar la orden como pagada
  try {
    // console.log({ status, purchase_units });

    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        isPaid: true,
        paidAt: new Date(),
      },
    });

    // Revalidar un path
    revalidatePath(`/orders/${orderId}`);

    return {
      ok: true,
      message: 'La orden ha sido pagada correctamente',
    };
  } catch (error) {
    console.log(error); // <-- en producción debemos utilizar algun sistema de logger como winston o un logger de terceros
    return {
      ok: false,
      message: 'Error 500 - No se pudo actualizar la orden',
    };
  }
};

const getPayPalBearerToken = async (): Promise<string | null> => {
  const base64token = Buffer.from(
    `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET_KEY}`,
    'utf-8'
  ).toString('base64');

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${base64token}`,
    },
    body: new URLSearchParams({ grant_type: 'client_credentials' }),
  };

  try {
    const result = await fetch(process.env.PAYPAL_OAUTH_URL!, {
      ...options,
      cache: 'no-store', // <-- propr propia de NextJs, esto para no guardar la respuesta en cache
    }).then((res) => res.json());

    if (!result.access_token) {
      return null;
    }

    return result.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const verifyPayPalPayment = async (
  paypalTransactionId: string,
  bearerToken: string
): Promise<PaypalOrderStatusResponse | null> => {
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  };

  try {
    const result = await fetch(
      `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`,
      {
        ...options,
        cache: 'no-store', // <-- propr propia de NextJs, esto para no guardar la respuesta en cache
      }
    ).then((res) => res.json());

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
