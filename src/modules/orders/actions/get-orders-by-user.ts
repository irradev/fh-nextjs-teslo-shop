import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getOrdersByUser = async () => {
  try {
    const session = await auth();

    if (!session?.user) {
      return {
        ok: false,
        orders: [],
        message: 'Debe estar autenticado.',
      };
    }

    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        userId: session.user.id,
      },
    });

    return {
      ok: true,
      orders,
      message: 'Ordenes obtenidas',
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      orders: [],
      message: 'Error al obtener las ordenes.',
    };
  }
};
