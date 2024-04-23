'use client';

import { notFound, redirect } from 'next/navigation';
import { ProductItem } from './ProductItem';
import { ProductListType } from '../../interfaces';
import { useCartStore } from '../../store';
import { useEffect, useState } from 'react';
import { CartProduct } from '@/modules/products/interfaces';
import { getOrderById } from '@/modules/orders/actions';

interface Props {
  type: ProductListType;
  orderId?: string;
}

export const ProductList = ({ type, orderId }: Props) => {
  const productsInCart = useCartStore((state) => state.cart);

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
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded && productsInCart.length === 0) {
      if (type !== 'cart') return;
      redirect('/empty');
    } else if (isLoaded && productsInCart.length > 0) {
      setProductItems(productsInCart);
    }
  }, [isLoaded, productsInCart]);

  useEffect(() => {
    if (type === 'order' && orderId) {
      getProductsInOrder();
    }
  }, [type, orderId]);

  if (!isLoaded) {
    return <span>Loading...</span>;
  }

  return (
    <div className="flex flex-col gap-6">
      {productItems.map((product) => (
        <ProductItem
          key={product.size + '_' + product.slug}
          product={product}
          showEditActions={type === 'cart'}
          type={type}
        />
      ))}
    </div>
  );
};
