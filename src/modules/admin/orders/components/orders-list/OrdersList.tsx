'use client';

import { CartProduct } from '@/modules/products/interfaces';
import { useEffect, useState } from 'react';
import { getOrderById } from '../../actions';
import { notFound } from 'next/navigation';
import { ProductItem } from '@/modules/cart/components/product-list/ProductItem';

interface Props {
  orderId?: string;
}

export const OrdersList = ({ orderId }: Props) => {
  const [productItems, setProductItems] = useState<CartProduct[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const getProductsInOrder = async () => {
    if (!orderId) return;
    const { ok, message, orderInfo } = await getOrderById(orderId);
    if (!ok) {
      // TODO: show error message?
      notFound();
    }
    // console.log(orderInfo);

    const products: CartProduct[] =
      orderInfo?.OrderItem.map((item) => ({
        id: item.productId,
        slug: item.product.slug,
        title: item.product.title,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        image: item.product.ProductImage[0].url,
      })) || [];

    setProductItems(products);
    setIsLoaded(true);
  };

  useEffect(() => {
    getProductsInOrder();
  }, []);

  if (!isLoaded) {
    return <span>Loading...</span>;
  }

  return (
    <div className="flex flex-col gap-6">
      {productItems.map((product) => (
        <ProductItem
          key={product.size + '_' + product.slug}
          product={product}
          showEditActions={false}
          type={'order'}
        />
      ))}
    </div>
  );
};
