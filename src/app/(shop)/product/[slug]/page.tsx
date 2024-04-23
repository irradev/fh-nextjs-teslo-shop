export const revalidate = 604800; // 7 days

import { ProductBySlugView } from '@/modules/products/ProductBySlugView';
import { getProductBySlug } from '@/modules/products/actions';
import { Metadata, ResolvingMetadata } from 'next';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const product = await getProductBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product?.title || 'Producto no encontrado',
    description: product?.description || '',
    openGraph: {
      title: product?.title || 'Producto no encontrado',
      description: product?.description || '',
      images: [`/products/${product?.images[1]}`],
    },
  };
}

export default function ProductPage({ params }: Props) {
  return <ProductBySlugView slug={params.slug} />;
}
