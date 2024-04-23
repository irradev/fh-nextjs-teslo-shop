import { IoArrowBackOutline } from 'react-icons/io5';
import { Title } from '@/modules/ui/components';
import { ProductList } from '@/modules/cart/components';
import { PaymentStatusBadge } from './components/payment-status-badge/PaymentStatusBadge';
import Link from 'next/link';
import { SummaryOrder } from './components';
import { getOrderById } from './actions';
import { notFound } from 'next/navigation';

interface Props {
  orderId: string;
}

export const OrderByIdView = async ({ orderId }: Props) => {
  {
    /* se debe trae la orden dese aquí y pasarlas la data por props a los componentes */
  }

  const order = await getOrderById(orderId);

  if (!order.orderInfo) return notFound();

  const isOrderPaid = order.orderInfo.isPaid;

  return (
    <div className="flex justify-center items-center mb-72 px-10 main-px ">
      <div className="flex flex-col w-full max-w-[1100px] ">
        <Title title={`Orden #${orderId.split('-').at(-1)}`} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-2 mt-5">
            {/* CTA more items */}
            <BackToOrders />

            {/* Status Order */}
            <PaymentStatusBadge isOrderPaid={isOrderPaid} />

            {/* Products In Cart */}
            <ProductList
              type="order"
              orderId={orderId}
            />
          </div>

          <div>
            {/* Resumen de orden */}
            <SummaryOrder
              type="order"
              orderId={orderId}
              isOrderPaid={isOrderPaid}
            />
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
