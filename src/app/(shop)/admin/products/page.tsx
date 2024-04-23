import { ProductsView } from '@/modules/admin/products/ProductsView';

interface Props {
  searchParams: {
    page?: string;
  };
}

export default function ProductsPage({ searchParams }: Props) {
  return <ProductsView searchParams={searchParams} />;
}
