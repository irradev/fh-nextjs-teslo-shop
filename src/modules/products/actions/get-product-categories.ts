import prisma from '@/lib/prisma';

export const getProductCategories = async () => {
  try {
    const categories = await prisma.category.findMany({});

    return categories;
  } catch (error) {
    console.log('Error al obtener las categorías');
    return [];
  }
};
