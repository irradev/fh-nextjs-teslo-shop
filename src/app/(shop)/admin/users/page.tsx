import { UsersView } from '@/modules/admin/users/UsersView';

interface Props {
  searchParams: {
    page?: string;
  };
}

export default function OrdersPage({ searchParams }: Props) {
  return <UsersView searchParams={searchParams} />;
}
