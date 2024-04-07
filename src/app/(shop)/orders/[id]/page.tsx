import { OrderByIdView } from '@/modules/orders/OrderByIdView';

interface Props {
  params: {
    id: string;
  };
}

export default function OrderByIdPage({ params }: Props) {
  // Todo: verificar ID
  // redirect()...

  return <OrderByIdView orderId={params.id} />;
}
