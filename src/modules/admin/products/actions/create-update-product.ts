import prisma from '@/lib/prisma';
import { Gender, Product, Size } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL || '');

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string().min(3).max(755),
  price: z.coerce
    .number()
    .min(0)
    .transform((value) => Number(value.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((value) => Number(value)),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform((value) => value.split(',')),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
});

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const productParsed = productSchema.safeParse(data);

  if (!productParsed.success) {
    console.log(productParsed.error);
    return {
      ok: false,
      message: 'Error al crear o editar el producto. Verifique los datos.',
    };
  }

  const productData = productParsed.data;
  productData.slug = productData.slug.toLowerCase().replace(/ /g, '-').trim();

  const { id, ...productToSave } = productData;

  try {
    const prismaTX = await prisma.$transaction(async (tx) => {
      let product: Product;
      const tagsArray = productToSave.tags
        .split(',')
        .map((tag) => tag.trim().toLowerCase());

      if (id) {
        // actualizar
        product = await tx.product.update({
          where: {
            id,
          },
          data: {
            ...productToSave,
            sizes: {
              set: productToSave.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });
      } else {
        // crear
        product = await tx.product.create({
          data: {
            ...productToSave,
            sizes: {
              set: productToSave.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });
      }

      // Proceso de carga y guardado de imagenes
      // Recorrer las imagenes y guardarlas
      if (formData.getAll('images')) {
        const images = await uploadImages(formData.getAll('images') as File[]);
        if (!images) {
          throw new Error('Error al subir las imagenes. Rollingback...');
        }

        await tx.productImage.createMany({
          data: (images as string[]).map((image) => ({
            productId: product.id,
            url: image,
          })),
        });
      }

      return product;
    });

    if (!prismaTX) {
      return {
        ok: false,
        message: 'Error al crear o editar el producto. Verifique los datos.',
      };
    }

    revalidatePath('/admin/products');
    revalidatePath('/admin/products/' + prismaTX.slug);
    revalidatePath('/products/' + prismaTX.slug);

    return {
      ok: true,
      product: prismaTX,
      message: 'Producto actualizado correctamente.',
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Error al crear o editar el proyecto. Verifique los datos.',
    };
  }
};

const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString('base64');
        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64Image}`)
          .then((r) => r.secure_url);
      } catch (error) {
        console.log(error);
        return null;
      }
    });

    const imagesUrls = await Promise.all(uploadPromises);

    return imagesUrls;
  } catch (error) {
    console.log(error);
    return null;
  }
};
