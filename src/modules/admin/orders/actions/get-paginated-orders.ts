import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

interface PaginationOptions {
  page?: number;
  take?: number;
}
export const getPaginatedOrders = async ({
  page = 1,
  take = 10,
}: PaginationOptions) => {
  try {
    const session = await auth();

    if (session?.user.role !== 'admin') {
      return {
        ok: false,
        orders: [],
        currentPage: 1,
        totalPages: 1,
        message: 'Debe estar autenticado.',
      };
    }

    if (isNaN(page)) page = 1;
    if (page < 1) page = 1;
    if (isNaN(take)) take = 10;
    if (take < 1) take = 10;

    const orders = await prisma.order.findMany({
      take: take,
      skip: (page - 1) * take,
      include: {
        OrderAddress: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const totalOrders = await prisma.order.count();
    const totalPages = Math.ceil(totalOrders / take);

    return {
      ok: true,
      orders,
      currentPage: page,
      totalPages: totalPages,
      message: 'Ordenes obtenidas',
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      orders: [],
      currentPage: 1,
      totalPages: 1,
      message: 'Error al obtener las ordenes.',
    };
  }
};
