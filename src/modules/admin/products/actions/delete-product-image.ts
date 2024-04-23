import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';
cloudinary.config(process.env.CLOUDINARY_URL || '');

export const deleteProductImage = async (imageId: number, imageUrl: string) => {
  if (!imageUrl.startsWith('http')) {
    return {
      ok: false,
      message: 'No se pueden borrar imagenes del fileSystem',
    };
  }

  const imageName = imageUrl.split('/').pop()?.split('.').shift() || '';

  try {
    await cloudinary.uploader.destroy(imageName);

    const deleteImage = await prisma.productImage.delete({
      where: {
        id: imageId,
      },
      select: {
        product: {
          select: {
            slug: true,
          },
        },
      },
    });

    // Revalidar los paths
    revalidatePath(`/admin/products`);
    revalidatePath(`/admin/products/${deleteImage.product.slug}`);
    revalidatePath(`/products/${deleteImage.product.slug}`);

    return {
      ok: true,
      message: 'Imagen borrada',
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Error al borrar la imagen',
    };
  }
};
