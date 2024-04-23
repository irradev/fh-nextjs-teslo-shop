import { auth } from '@/auth.config';

import { Title } from '@/modules/ui/components';
import { redirect } from 'next/navigation';

export const ProfileView = async () => {
  const session = await auth();

  if (!session?.user) {
    // redirect('/auth/login?returnTo=/profile');
    redirect('/auth/login');
  }

  return (
    <div className="main-px">
      <Title title="Mi perfil" />

      <pre>{JSON.stringify(session?.user, null, 2)}</pre>
      <h3 className="text-3xl mb-10">{session.user.role}</h3>
    </div>
  );
};
