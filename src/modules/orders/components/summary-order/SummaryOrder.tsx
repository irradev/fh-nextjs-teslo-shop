import Link from 'next/link';
import React from 'react';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { ProductListType } from '@/modules/cart/interfaces';
import { PaymentStatusBadge } from '../payment-status-badge/PaymentStatusBadge';

interface Props {
  type: ProductListType;
}

export const SummaryOrder = ({ type }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-xl p-7 ">
      {type !== 'cart' ? <UserAddress type={type} /> : null}

      <SummaryDetails />

      {type !== 'order' ? (
        <CheckoutLink type={type} />
      ) : (
        <PaymentStatusBadge
          isOrderPaid
          className="mt-5"
        />
      )}
    </div>
  );
};

function SummaryDetails() {
  return (
    <div className="flex flex-col gap-4 ">
      <h2 className="text-2xl ">Resumen de orden</h2>
      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right mb-2">3 artículos</span>
        <span>Subtotal</span>
        <span className="text-right">$100</span>
        <span>Impuestos (15%)</span>
        <span className="text-right">$100</span>
        <span className="text-2xl mt-5">TOTAL</span>
        <span className="text-right text-2xl mt-5">$100 MXN</span>
      </div>
    </div>
  );
}

function UserAddress({ type }: Props) {
  return (
    <div className="flex flex-col gap-4 mb-10">
      <h2 className="text-2xl">Dirección de entrega</h2>

      <div className="flex flex-col gap-2 p-4 bg-blue-50 shadow-md rounded-md">
        <span className="font-semibold text-lg">Israel Vázquez</span>
        <div className="flex flex-wrap gap-2">
          <span>Rómulo #423</span>
          <span>Col. Concordia</span>
          <span>Salinas Sepúlveda</span>
        </div>
        <div className="flex gap-4">
          <span>Nuevo León, México</span>
          <span>CP: 66400</span>
        </div>
        <span className="mt-2">Teléfono: +52 55 1234 5678</span>
      </div>

      {type === 'checkout' ? (
        <div className="flex justify-end">
          <Link
            className="underline hover:text-blue-600 transition-colors"
            href="/checkout/address"
          >
            Cambiar dirección
          </Link>
        </div>
      ) : null}
    </div>
  );
}

function CheckoutLink({ type }: Props) {
  return (
    <div className="mt-10 w-full">
      {/* Disclaimer */}
      {type === 'checkout' ? (
        <div className="flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-6 mb-12 p-2 sm:p-4 border-dotted border-4 border-red-200 bg-red-50">
          <IoInformationCircleOutline
            size={40}
            className="text-gray-500 opacity-35 flex-shrink-0"
          />
          <p className="text-sm text-center  ">
            Al confirmar tu pedido, aceptas nuestros <br />
            <Link
              href="/terms"
              className="underline hover:text-blue-600 transition-colors"
            >
              términos y condiciones de uso
            </Link>
          </p>
        </div>
      ) : null}

      <Link
        className="flex btn-primary justify-center"
        href={type === 'cart' ? '/checkout/address' : '/orders/123'}
      >
        {type === 'cart' ? 'Preparar pedido' : 'Confirmar pedido'}
      </Link>
    </div>
  );
}
