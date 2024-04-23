'use client';

import Link from 'next/link';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { ProductListType } from '@/modules/cart/interfaces';
import { PaymentStatusBadge } from '@/modules/orders/components/payment-status-badge/PaymentStatusBadge';
import { type SummaryDetailsProps, SummaryDetails } from './SummaryDetails';
import {
  type SummaryOrderAddressProps,
  SummaryOrderAddress,
} from '../summary-order-address/SummaryOrderAddress';

import { useEffect, useState } from 'react';
import { useCartStore } from '@/modules/cart/store';
import { getOrderById } from '../../actions';
import { notFound } from 'next/navigation';

interface Props {
  orderId?: string;
  isOrderPaid?: boolean;
}

export const SummaryOrder = ({ orderId, isOrderPaid = false }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [summaryDetails, setSummaryDetails] = useState<
    (SummaryDetailsProps & SummaryOrderAddressProps) | null
  >(null);

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
      orderAddress: {
        firstName: orderInfo!.OrderAddress?.firstName || '',
        lastName: orderInfo!.OrderAddress?.lastName || '',
        address: orderInfo!.OrderAddress?.address || '',
        address_second: orderInfo!.OrderAddress?.address_second || '',
        city: orderInfo!.OrderAddress?.city || '',
        state: orderInfo!.OrderAddress?.state || '',
        country: orderInfo!.OrderAddress?.country.name || '',
        zipCode: orderInfo!.OrderAddress?.postalCode || '',
        phone: orderInfo!.OrderAddress?.phone || '',
      },
    });

    setIsLoaded(true);
  };

  useEffect(() => {
    getSummaryDetailsInOrder();
  }, []);

  if (!isLoaded || !summaryDetails) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-xl shadow-xl p-7 ">
      <SummaryOrderAddress orderAddress={summaryDetails.orderAddress} />

      <SummaryDetails {...summaryDetails} />

      <PaymentStatusBadge
        isOrderPaid={isOrderPaid}
        className="mt-5"
      />
    </div>
  );
};
