import Image from 'next/image';
import clsx from 'clsx';
import { Product } from '@/modules/products/interfaces';
import { ProductItemActions } from './ProductItemActions';
import { ProductListType } from '../../interfaces';

interface Props {
  product: Product;
  showEditActions?: boolean;
  type?: ProductListType;
}
export const ProductItem = ({
  product,
  showEditActions = true,
  type = 'cart',
}: Props) => {
  return (
    <div className="flex items-start gap-4 border-t-2 border-gray-300 w-full pt-4 ">
      {/* image  */}
      <ProductImage
        imageUrl={`/products/${product.images[0]}`}
        title={product.title}
      />

      <div className="flex flex-col justify-start items-start gap-2 md:flex-row-reverse   w-full">
        {/* price */}
        {type !== 'order' ? <ProductPrice price={product.price * 3} /> : null}

        <div
          className={clsx(
            'flex-grow flex flex-col justify-between ',
            showEditActions ? 'gap-4' : 'gap-2'
          )}
        >
          {/* title  */}
          <p className="font-bold ">{product.title}</p>

          {/* quantity selector, remove, */}
          {showEditActions ? (
            <ProductItemActions
              productId={'ddd'}
              quantity={1}
            />
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <span className="text-gray-400 text-sm"> Precio</span>
                <p className="text-lg">${product.price}</p>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-sm"> Cantidad</span>
                <p className="text-lg">x3</p>
              </div>
              {type === 'order' ? (
                <div className="flex flex-col">
                  <span className="text-gray-400 text-sm"> Subtotal</span>
                  <p className="text-lg">${product.price * 3}</p>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function ProductImage({
  imageUrl,
  title,
}: {
  imageUrl: string;
  title: string;
}) {
  return (
    <Image
      src={imageUrl}
      alt={title}
      width={100}
      height={100}
      className="rounded object-cover"
    />
  );
}

function ProductPrice({ price }: { price: number }) {
  return (
    <div className="flex flex-row md:flex-col items-start md:items-end gap-1 ">
      <span className="text-3xl">${price}</span>
      <span className="text-lg">MXN</span>
    </div>
  );
}
