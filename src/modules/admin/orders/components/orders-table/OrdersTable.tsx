import Link from 'next/link';
import { type OrderRowProps, OrderRow } from './OrderRow';

interface Props {
  orders: OrderRowProps[];
}

export const OrdersTable = ({ orders }: Props) => {
  return (
    <table className="min-w-full">
      <thead className="bg-gray-200 border-b">
        <tr>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            #ID
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Nombre completo
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Estado
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Opciones
          </th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <OrderRow
            key={order.orderId}
            orderId={order.orderId}
            isPaid={order.isPaid}
            userFullName={order.userFullName}
          />
        ))}
      </tbody>
    </table>
  );
};
