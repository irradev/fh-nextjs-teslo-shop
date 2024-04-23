import prisma from '@/lib/prisma';
import { sleep } from '@/utils';

export const getStockBySlug = async (slug: string): Promise<number> => {
  try {
    await sleep(2);

    const stock = await prisma.product.findUnique({
      where: {
        slug,
      },
      select: {
        inStock: true,
      },
    });

    return stock?.inStock || 0;
  } catch (error) {
    console.log(error);
    throw new Error('Error al obtener el stock por slug');
  }
};
