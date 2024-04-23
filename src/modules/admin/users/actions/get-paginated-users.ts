import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getPaginatedUsers = async ({
  page = 1,
  take = 10,
}: PaginationOptions) => {
  const session = await auth();

  if (session?.user.role !== 'admin') {
    return {
      ok: false,
      users: [],
      currentPage: 1,
      totalPages: 1,
      message: 'Debe ser un usuario administrador.',
    };
  }

  if (isNaN(page)) page = 1;
  if (page < 1) page = 1;
  if (isNaN(take)) take = 10;
  if (take < 1) take = 10;

  const users = await prisma.user.findMany({
    orderBy: {
      name: 'desc',
    },
  });

  const totalUsers = await prisma.user.count();
  const totalPages = Math.ceil(totalUsers / take);

  return {
    ok: true,
    users: users,
    currentPage: page,
    totalPages: totalPages,
    message: 'Usuarios obtenidos.',
  };
};
