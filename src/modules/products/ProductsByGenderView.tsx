import { notFound, redirect } from 'next/navigation';

import { QueryPagination, Title } from '@/modules/ui/components';
import { EmptyProducts, ProductGrid } from '@/modules/products/components';
import { getPaginatedProductsWithImages } from '@/modules/products/actions';
import type { Gender } from './interfaces';

interface Props {
  gender: Gender;
  searchParams: {
    page?: string;
  };
}

export const ProductsByGenderView = async ({ gender, searchParams }: Props) => {
  const labels: Record<Gender, string> = {
    men: 'para Hombres',
    women: 'para Mujeres',
    kid: 'para Niños',
    unisex: 'Unisex',
  };

  if (!labels[gender]) notFound();

  const { products, totalPages } = await getPaginatedProductsWithImages({
    gender,
    page: Number(searchParams.page),
  });

  if (products.length === 0) {
    if (Number(searchParams.page) > 0) redirect('/genders/' + gender);
  }

  return (
    <>
      <section
        id="products-by-gender"
        className="main-px"
      >
        <Title
          title={`Productos ${labels[gender]}`}
          // subtitle={`Productos para ${labels[gender]}`}
          className="mb-2"
        />
        {products.length > 0 ? (
          <>
            <ProductGrid products={products} />
            <QueryPagination totalPages={totalPages} />
          </>
        ) : (
          <EmptyProducts />
        )}
      </section>
    </>
  );
};
