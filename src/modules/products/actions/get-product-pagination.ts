import prisma from '@/lib/prisma';
import type { Gender } from '@prisma/client';

interface PaginationOptions {
  page?: number;
  take?: number;
  gender?: string;
  categoryId?: string;
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
  gender,
  categoryId,
}: PaginationOptions) => {
  if (isNaN(page)) page = 1;
  if (page < 1) page = 1;
  if (isNaN(take)) take = 12;
  if (take < 1) take = 12;

  try {
    // 1. Obtener los productos
    const products = await prisma.product.findMany({
      take: take,
      skip: (page - 1) * take,
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
            id: true,
            productId: true,
          },
        },
      },
      where: {
        gender: gender as Gender,
        categoryId: categoryId,
      },
    });

    // 2. Obtener el total de paginas
    const totalProducts = await prisma.product.count({
      where: {
        gender: gender as Gender,
        categoryId: categoryId,
      },
    });
    const totalPages = Math.ceil(totalProducts / take);

    return {
      currentPage: page,
      totalPages: totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
      })),
    };
  } catch (error) {
    throw new Error('No se pudo cargar los productos');
  }
};
