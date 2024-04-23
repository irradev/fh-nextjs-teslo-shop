'use client';

import { Product } from '@/modules/products/interfaces';
import clsx from 'clsx';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { createUpdateProduct, deleteProductImage } from '../../actions';
import { useRouter } from 'next/navigation';
import { ProductImage } from '@/modules/products/components';

interface Props {
  product: Partial<Product>;
  categories: {
    id: string;
    name: string;
  }[];
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

interface FormInputs {
  title: string;
  description: string;
  slug: string;
  price: number;
  inStock: number;
  sizes: string[];
  tags: string;
  gender: 'men' | 'women' | 'kid' | 'unisex';
  categoryId: string;

  images?: FileList;
}

export const ProductForm = ({ product, categories }: Props) => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { isValid },
    getValues,
    setValue,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      title: product.title || '',
      description: product.description || '',
      slug: product.slug || '',
      price: product.price || 0,
      inStock: product.inStock || 0,
      sizes: product.sizes || [],
      tags: product.tags?.join(',') || '',
      gender: product.gender || 'unisex',
      categoryId: product.categoryId || '',
      images: undefined,
    },
  });

  watch('sizes');

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();

    const { images, ...productToSave } = data;

    if (product.id) {
      formData.append('id', product.id);
    }
    formData.append('title', productToSave.title);
    formData.append('slug', productToSave.slug);
    formData.append('description', productToSave.description);
    formData.append('price', String(productToSave.price));
    formData.append('inStock', String(productToSave.inStock));
    formData.append('sizes', String(productToSave.sizes));
    formData.append('tags', String(productToSave.tags));
    formData.append('gender', productToSave.gender);
    formData.append('categoryId', productToSave.categoryId);

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
    }

    const {
      ok,
      message,
      product: productSaved,
    } = await createUpdateProduct(formData);

    if (!ok) {
      alert('Producto no se pudo actualizar.');
      return;
    }

    if (!productSaved) {
      alert('Error al obtener el producto actualizado');
      return;
    }

    router.replace(`/admin/products/${productSaved.slug}`);
  };

  const onDeleteImage = async (imageId: number, imageUrl: string) => {
    await deleteProductImage(imageId, imageUrl);
  };

  const onSizeChange = (size: string) => {
    const sizes = new Set(getValues('sizes'));

    sizes.has(size) ? sizes.delete(size) : sizes.add(size);

    setValue('sizes', Array.from(sizes));
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
    >
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Título</span>
          <input
            {...register('title', { required: true })}
            type="text"
            className="p-2 border rounded-md bg-gray-200"
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
            {...register('slug', { required: true })}
            type="text"
            className="p-2 border rounded-md bg-gray-200"
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Descripción</span>
          <textarea
            {...register('description', { required: true })}
            rows={5}
            className="p-2 border rounded-md bg-gray-200"
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input
            {...register('price', { required: true, min: 0 })}
            type="number"
            className="p-2 border rounded-md bg-gray-200"
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input
            {...register('tags', { required: true })}
            type="text"
            className="p-2 border rounded-md bg-gray-200"
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select
            {...register('gender', { required: true })}
            className="p-2 border rounded-md bg-gray-200"
          >
            <option value="">[Seleccione]</option>

            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Categoria</span>
          <select
            {...register('categoryId', { required: true })}
            className="p-2 border rounded-md bg-gray-200"
          >
            <option value="">[Seleccione]</option>
            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className={clsx('w-full', isValid ? 'btn-primary' : 'btn-disabled')}
        >
          Guardar
        </button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Inventario</span>
          <input
            {...register('inStock', { required: true, min: 0 })}
            type="number"
            className="p-2 border rounded-md bg-gray-200"
          />
        </div>

        {/* As checkboxes */}
        <div className="flex flex-col">
          <span>Tallas</span>
          <div className="flex flex-wrap">
            {sizes.map((size) => (
              // bg-blue-500 text-white <--- si está seleccionado
              <div
                key={size}
                onClick={() => onSizeChange(size)}
                className={clsx(
                  'p-2 border rounded-md mr-2 mb-2 w-20 sm:w-1/4 transition-all text-center cursor-pointer',
                  {
                    'bg-blue-500 text-white': getValues('sizes').includes(size),
                  }
                )}
              >
                <span>{size}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col mb-2">
            <span>Fotos</span>
            <input
              type="file"
              {...register('images')}
              multiple
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpeg, image/avif"
            />
          </div>

          <div className="grid gird-cols-1 sm:grid-cols-3 gap-3">
            {product.ProductImage?.map((image) => (
              <div key={image.id}>
                <ProductImage
                  src={image.url}
                  alt={product?.title || ''}
                  width={300}
                  height={300}
                  className="rounded-t shadow-md object-cover"
                />
                <button
                  type="button"
                  onClick={() => onDeleteImage(image.id, image.url)}
                  className="btn-danger w-full rounded-b-xl"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};
