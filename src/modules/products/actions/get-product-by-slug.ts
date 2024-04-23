import prisma from '@/lib/prisma';

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findUnique({
      include: {
        ProductImage: {
          select: {
            url: true,
            id: true,
            productId: true,
          },
        },
      },
      where: {
        slug,
      },
    });

    if (!product) return null;

    // const { ProductImage, ...rest } = product;

    return {
      ...product,
      images: product.ProductImage.map((image) => image.url),
    };
  } catch (error) {
    console.log(error);
    throw new Error('Error al obtener el producto por slug');
  }
};
