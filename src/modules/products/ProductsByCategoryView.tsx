import { notFound, redirect } from 'next/navigation';

import { QueryPagination, Title } from '@/modules/ui/components';
import { EmptyProducts, ProductGrid } from '@/modules/products/components';
import {
  getPaginatedProductsWithImages,
  getProductCategories,
} from '@/modules/products/actions';

interface Props {
  category: string;
  searchParams: {
    page?: string;
  };
}

export const ProductsByCategoryView = async ({
  category,
  searchParams,
}: Props) => {
  const categoriesFound = await getProductCategories();

  if (categoriesFound.length === 0) {
    notFound();
  }

  const categoryRequest = categoriesFound.filter(
    (cat) => cat.name.toLowerCase() === category.toLowerCase()
  )[0];

  if (!categoryRequest) {
    notFound();
  }

  const { products, totalPages } = await getPaginatedProductsWithImages({
    categoryId: categoryRequest.id,
    page: Number(searchParams.page),
  });

  if (products.length === 0) {
    if (Number(searchParams.page) > 0) redirect('/categories/' + category);
  }

  return (
    <>
      <section
        id="products-by-category"
        className="main-px"
      >
        <Title
          title={`Categoría: ${category}`}
          // subtitle={`Productos para ${labels[gender]}`}
          className="mb-2 capitalize"
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
