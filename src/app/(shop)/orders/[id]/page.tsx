import { auth } from '@/auth.config';
import { OrderByIdView } from '@/modules/orders/OrderByIdView';
import { redirect } from 'next/navigation';

interface Props {
  params: {
    id: string;
  };
}

export default async function OrderByIdPage({ params }: Props) {
  // Todo: verificar ID
  // redirect()...
  const session = await auth();

  if (!session?.user) {
    redirect('/auth/login?redirectTo=/orders/' + params.id);
  }

  return <OrderByIdView orderId={params.id} />;
}
