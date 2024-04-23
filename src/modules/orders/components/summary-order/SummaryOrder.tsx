'use client';

import Link from 'next/link';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { ProductListType } from '@/modules/cart/interfaces';
import { PaymentStatusBadge } from '../payment-status-badge/PaymentStatusBadge';
import { type SummaryDetailsProps, SummaryDetails } from './SummaryDetails';
import { SummaryUserAddress } from '../summary-user-address/SummaryUserAddress';
import { CheckoutConfirmButton } from './CheckoutConfirmButton';
import { useEffect, useState } from 'react';
import { useCartStore } from '@/modules/cart/store';
import { getOrderById } from '../../actions';
import { notFound } from 'next/navigation';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { PaypalButton } from '../paypal/PaypalButton';

interface Props {
  type: ProductListType;
  orderId?: string;
  isOrderPaid?: boolean;
}

export const SummaryOrder = ({ type, orderId, isOrderPaid = false }: Props) => {
  const summaryInfo = useCartStore((state) => state.getSummaryInformation());
  const [isLoaded, setIsLoaded] = useState(false);
  const [summaryDetails, setSummaryDetails] =
    useState<SummaryDetailsProps | null>(null);

  const getSummaryDetailsInOrder = async () => {
    if (!orderId) return;
    const { ok, orderInfo } = await getOrderById(orderId);
    if (!ok) {
      // TODO: show error message?
      notFound();
    }
    setSummaryDetails({
      totalProducts: orderInfo!.itemsInOrder,
      subTotal: orderInfo!.subTotal,
      tax: orderInfo!.tax,
      total: orderInfo!.total,
    });
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded && type !== 'order') {
      setSummaryDetails({
        ...summaryInfo,
        totalProducts: summaryInfo.itemsInCart,
      });
    } else if (isLoaded && type === 'order') {
      getSummaryDetailsInOrder();
    }
  }, [isLoaded, type]);

  if (!isLoaded || !summaryDetails) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-xl shadow-xl p-7 ">
      {type !== 'cart' ? <SummaryUserAddress type={type} /> : null}

      <SummaryDetails {...summaryDetails} />

      {type !== 'order' ? (
        <div className="mt-10 w-full">
          {/* Disclaimer */}
          <TermsAndConditionsLink type={type} />

          {/* CTAs Checkout */}
          {type === 'cart' ? <CheckoutLink /> : <CheckoutConfirmButton />}
        </div>
      ) : isOrderPaid ? (
        <PaymentStatusBadge
          isOrderPaid={isOrderPaid}
          className="mt-5"
        />
      ) : (
        <PaypalButton
          orderId={orderId!}
          amount={summaryDetails.total}
        />
      )}
    </div>
  );
};

function CheckoutLink() {
  return (
    <Link
      className="flex btn-primary justify-center"
      href="/checkout/address"
    >
      Preparar pedido
    </Link>
  );
}

function TermsAndConditionsLink({ type }: Props) {
  return type === 'checkout' ? (
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
  ) : null;
}
