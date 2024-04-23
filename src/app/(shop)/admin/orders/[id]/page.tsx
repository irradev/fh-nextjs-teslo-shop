import { OrderByIdView } from '@/modules/admin/orders/OrderByIdView';

interface Props {
  params: {
    id: string;
  };
}

export default function OrderByIdPage({ params }: Props) {
  return <OrderByIdView orderId={params.id} />;
}
