import Link from 'next/link';
import { Product } from '../../interfaces';
import { ProductGridImage } from './ProductGridImage';

interface Props {
  product: Product;
}
export const ProductGridItem = ({ product }: Props) => {
  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={`/product/${product.slug}`}>
        <ProductGridImage
          images={product.images}
          title={product.title}
        />
      </Link>

      <div className="p-4 flex flex-col">
        <Link
          href={`/product/${product.slug}`}
          className="hover:text-blue-600 hover:underline"
        >
          {product.title}
        </Link>
        <span className="font-bold">${product.price}</span>
      </div>
    </div>
  );
};
