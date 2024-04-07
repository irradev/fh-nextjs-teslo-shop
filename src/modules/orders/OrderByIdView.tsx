import clsx from 'clsx';
import { IoArrowBackOutline, IoCardOutline } from 'react-icons/io5';
import { Title } from '@/modules/ui/components';
import { ProductList, SummaryOrder } from '@/modules/cart/components';
import { PaymentStatusBadge } from './components/payment-status-badge/PaymentStatusBadge';
import Link from 'next/link';

interface Props {
  orderId: string;
}

export const OrderByIdView = ({ orderId }: Props) => {
  return (
    <div className="flex justify-center items-center mb-72 px-10 main-px ">
      <div className="flex flex-col w-full max-w-[1100px] ">
        <Title title={`Orden #${orderId}`} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-2 mt-5">
            {/* CTA more items */}
            <BackToOrders />

            {/* Status Order */}
            <PaymentStatusBadge isOrderPaid />

            {/* Products In Cart */}
            <ProductList type="order" />
          </div>

          <div>
            {/* Resumen de orden */}
            <SummaryOrder type="order" />
          </div>
        </div>
      </div>
    </div>
  );
};

function BackToOrders() {
  return (
    <div className="flex justify-end items-center  gap-4 mb-4">
      <Link
        href="/orders"
        className="flex items-center gap-2 underline hover:text-blue-600 transition-colors"
      >
        <IoArrowBackOutline size={18} />
        Ver ordenes
      </Link>
    </div>
  );
}
