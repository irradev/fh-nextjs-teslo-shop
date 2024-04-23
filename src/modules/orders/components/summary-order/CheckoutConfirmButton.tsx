'use client';

import { useState } from 'react';
import clsx from 'clsx';

import { useAddressStore } from '@/modules/checkout/store';
import { useCartStore } from '@/modules/cart/store';
import { placeOrder } from '../../actions';
import { useRouter } from 'next/navigation';

export const CheckoutConfirmButton = () => {
  const router = useRouter();

  const address = useAddressStore((state) => state.address);
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [messageError, setMessageError] = useState('');

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      size: product.size,
      quantity: product.quantity,
    }));

    if (!address) {
      //Todo: usar librería sonner para alertas
      alert('Por favor, ingrese una dirección de envío');
      return;
    }

    const resp = await placeOrder(productsToOrder, address);

    if (!resp.ok) {
      setIsPlacingOrder(false);
      setMessageError(resp.message);

      return;
    }

    clearCart();
    router.replace('/orders/' + resp.order?.id);
  };

  return (
    <div className="flex flex-col gap-4">
      {messageError ? (
        <p className="text-red-500">
          <b>Lo sentimos, no fue posible procesar la orden.</b>
          <br />
          {messageError}
        </p>
      ) : null}
      <button
        onClick={onPlaceOrder}
        className={clsx(
          'flex  justify-center',
          isPlacingOrder ? 'btn-disabled' : 'btn-primary'
        )}
      >
        Confirmar pedido
      </button>
    </div>
  );
};
