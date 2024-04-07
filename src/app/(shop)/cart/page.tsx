import { CartView } from '@/modules/cart/CartView';
import { redirect } from 'next/navigation';

export default function CartPage() {
  redirect('/empty');

  return <CartView />;
}
