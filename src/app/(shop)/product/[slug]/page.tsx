import { ProductBySlugView } from '@/modules/products/ProductBySlugView';

interface Props {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: Props) {
  return <ProductBySlugView slug={params.slug} />;
}
