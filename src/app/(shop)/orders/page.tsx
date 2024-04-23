import { auth } from '@/auth.config';
import { OrdersView } from '@/modules/orders/OrdersView';
import { redirect } from 'next/navigation';

export default async function OrdersPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/auth/login?redirectTo=/orders');
  }

  return <OrdersView />;
}
