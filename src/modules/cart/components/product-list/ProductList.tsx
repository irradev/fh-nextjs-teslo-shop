import { initialData } from '@/seed/seed';
import { ProductItem } from './ProductItem';
import { ProductListType } from '../../interfaces';

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  type: ProductListType;
}

export const ProductList = ({ type }: Props) => {
  return (
    <div className="flex flex-col gap-6">
      {productsInCart.map((product) => (
        <ProductItem
          key={product.slug}
          product={product}
          showEditActions={type === 'cart'}
          type={type}
        />
      ))}
    </div>
  );
};
