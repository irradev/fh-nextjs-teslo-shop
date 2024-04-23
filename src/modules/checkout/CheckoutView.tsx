'use client';

import Link from 'next/link';
import { IoArrowBackOutline } from 'react-icons/io5';
import { Title } from '@/modules/ui/components';
import { ProductList } from '@/modules/cart/components';
import { SummaryOrder } from '../orders/components';
import { useCartStore } from '../cart/store';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

export const CheckoutView = () => {
  const productsInCart = useCartStore((state) => state.cart);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded && productsInCart.length === 0) {
      redirect('/empty');
    }
  }, [isLoaded]);

  return (
    <div className="flex justify-center items-center mb-72 px-10 main-px ">
      <div className="flex flex-col w-full max-w-[1100px] ">
        <Title title="Verificar orden" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-2 mt-5">
            {/* CTA Add more items */}
            <EditItems />

            {/* Products In Cart * deberiamos pasarle los productos por props */}
            <ProductList type="checkout" />
          </div>

          <div>
            {/* Resumen de orden */}
            <SummaryOrder type="checkout" />
          </div>
        </div>
      </div>
    </div>
  );
};

function EditItems() {
  return (
    <div className="flex justify-between items-center  gap-4 mb-4">
      <span className="text-xl">Tus productos</span>
      <Link
        href="/cart"
        className="flex items-center gap-2 underline hover:text-blue-600 transition-colors"
      >
        <IoArrowBackOutline size={18} />
        Editar carrito
      </Link>
    </div>
  );
}
