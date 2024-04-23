import { ProductsByCategoryView } from '@/modules/products/ProductsByCategoryView';

interface Props {
  params: {
    category: string;
  };
  searchParams: {
    page?: string;
  };
}

export default function CategoryPage({ params, searchParams }: Props) {
  return (
    <ProductsByCategoryView
      category={params.category}
      searchParams={searchParams}
    />
  );
}
