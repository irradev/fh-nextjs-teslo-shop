// https://tailwindcomponents.com/component/hoverable-table

import { Title } from '@/modules/ui/components';
import { getOrdersByUser } from './actions';
import { redirect } from 'next/navigation';
import { OrdersTable } from './components/orders-table/OrdersTable';

export const OrdersView = async () => {
  const { ok, orders } = await getOrdersByUser();

  if (!ok) return redirect('/');
  if (!orders.length) return redirect('/');

  return (
    <div className="main-px overflow-auto">
      <Title title="Orders" />

      <div className="mb-10">
        <OrdersTable
          orders={orders.map((order) => ({
            orderId: order.id,
            isPaid: order.isPaid,
            userFullName: `${order.user.name}`,
          }))}
        />
      </div>
    </div>
  );
};
