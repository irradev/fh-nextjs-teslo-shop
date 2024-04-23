import prisma from '@/lib/prisma';

export const setOrderTransactionId = async (
  orderId: string,
  transactionId: string
) => {
  try {
    // Este método, ya está protegido por el token de autenticación

    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        transactionId,
      },
    });

    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
    };
  }
};
