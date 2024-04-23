import { QueryPagination, Title } from '@/modules/ui/components';
import { UsersTable } from './components';
import { getPaginatedUsers } from './actions';
import { redirect } from 'next/navigation';

interface Props {
  searchParams: {
    page?: string;
  };
}

export const UsersView = async ({ searchParams }: Props) => {
  const { ok, users, totalPages } = await getPaginatedUsers({
    page: Number(searchParams.page),
  });

  if (!ok) return redirect('/');
  if (!users) return redirect('/');

  if (users.length === 0) {
    if (Number(searchParams.page) > 0) redirect('/admin/users');
    else redirect('/');
  }

  return (
    <div className="main-px overflow-auto">
      <Title title="Manage Users" />

      <div className="mb-10">
        {users.length > 0 ? (
          <>
            <UsersTable users={users} />
            <QueryPagination
              totalPages={totalPages}
              className="mt-4"
            />
          </>
        ) : (
          <div>
            <p>No hay usuarios.</p>
          </div>
        )}
      </div>
    </div>
  );
};
