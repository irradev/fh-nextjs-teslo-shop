import { redirect } from 'next/navigation';
import { QueryPagination, Title } from '@/modules/ui/components';
import { EmptyProducts, ProductGrid } from '@/modules/products/components';
import { getPaginatedProductsWithImages } from '@/modules/products/actions';

interface Props {
  searchParams: {
    page?: string;
  };
}
export const HomeView = async ({ searchParams }: Props) => {
  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({
      page: Number(searchParams.page),
    });

  if (products.length === 0) {
    if (Number(searchParams.page) > 0) redirect('/');
  }

  return (
    <>
      <section
        id="products"
        className="main-px"
      >
        <Title
          title="Tienda"
          subtitle="Todos los productos"
          className="mb-2"
        />

        {products.length > 0 ? (
          <>
            <ProductGrid products={products} />
            <QueryPagination totalPages={totalPages} />
          </>
        ) : (
          <EmptyProducts hrefText="Refrescar página" />
        )}
      </section>
    </>
  );
};
