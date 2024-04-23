import { Title } from '@/modules/ui/components';

import { notFound, redirect } from 'next/navigation';

import {
  getProductBySlug,
  getProductCategories,
} from '@/modules/products/actions';
import { ProductForm } from './components';

interface Props {
  slug: string;
}

export const ProductBySlugView = async ({ slug }: Props) => {
  const [product, productCategories] = await Promise.all([
    getProductBySlug(slug),
    getProductCategories(),
  ]);

  if (!product && slug !== 'new') redirect('/admin/products');
  const title = slug === 'new' ? 'Nuevo producto' : 'Editar producto';

  return (
    <div className="flex justify-center items-center mb-72 px-10 main-px ">
      <div className="flex flex-col w-full max-w-[1100px] ">
        <Title title={title} />
        <ProductForm
          product={product || {}}
          categories={productCategories}
        />
      </div>
    </div>
  );
};
