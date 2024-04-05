import { CategoryByIdView } from '@/modules/products/categories/CategoryByIdView';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    id: string;
  };
}

export default function CategoryPage({ params }: Props) {
  const { id } = params;

  if (id === 'kids') {
    notFound();
  }

  return <CategoryByIdView />;
}
