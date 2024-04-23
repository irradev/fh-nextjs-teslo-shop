import { QueryPagination, Title } from '@/modules/ui/components';
import { getPaginatedOrders } from './actions';
import { redirect } from 'next/navigation';
import { OrdersTable } from './components/orders-table/OrdersTable';

interface Props {
  searchParams: {
    page?: string;
  };
}

export const OrdersView = async ({ searchParams }: Props) => {
  const { ok, orders, totalPages } = await getPaginatedOrders({
    page: Number(searchParams.page),
  });

  if (!ok) return redirect('/');
  if (!orders) return redirect('/');

  if (orders.length === 0) {
    if (Number(searchParams.page) > 0) redirect('/admin/orders');
    else redirect('/');
  }

  return (
    <div className="main-px overflow-auto">
      <Title title="All Orders" />

      <div className="mb-10">
        {orders.length > 0 ? (
          <>
            <OrdersTable
              orders={orders.map((order) => ({
                orderId: order.id,
                isPaid: order.isPaid,
                userFullName: `${order.OrderAddress?.firstName} ${order.OrderAddress?.lastName}`,
              }))}
            />
            <QueryPagination
              totalPages={totalPages}
              className="mt-4"
            />
          </>
        ) : (
          <div>
            <p>Por el momento no se ha registrado ninguna orden de compra</p>
          </div>
        )}
      </div>
    </div>
  );
};
