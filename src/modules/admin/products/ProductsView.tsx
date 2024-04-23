import { QueryPagination, Title } from '@/modules/ui/components';
import { redirect } from 'next/navigation';
import { ProductsTable } from './components';
import { getPaginatedProductsWithImages } from '@/modules/products/actions';
import Link from 'next/link';

interface Props {
  searchParams: {
    page?: string;
  };
}

export const ProductsView = async ({ searchParams }: Props) => {
  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({
      page: Number(searchParams.page),
    });

  if (products.length === 0) {
    if (Number(searchParams.page) > 0) redirect('/admin/products');
    else redirect('/');
  }

  return (
    <div className="main-px overflow-auto">
      <Title title="Mantenimiento de Productos" />

      <div className="flex justify-end mb-5">
        <Link
          href="/admin/products/new"
          className="btn-primary"
        >
          Crear nuevo producto
        </Link>
      </div>

      <div className="mb-10">
        {products.length > 0 ? (
          <>
            <ProductsTable products={products} />
            <QueryPagination
              totalPages={totalPages}
              className="mt-4"
            />
          </>
        ) : (
          <div>
            <p>Por el momento no se ha registrado ninguna orden de compra</p>
          </div>
        )}
      </div>
    </div>
  );
};
