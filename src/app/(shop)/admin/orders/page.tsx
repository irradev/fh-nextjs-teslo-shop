import { OrdersView } from '@/modules/admin/orders/OrdersView';

interface Props {
  searchParams: {
    page?: string;
  };
}

export default function OrdersPage({ searchParams }: Props) {
  return <OrdersView searchParams={searchParams} />;
}
