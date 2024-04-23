import { titleFont } from '@/config/fonts';
import { DivisorLink, LoginForm } from './components';

export const LoginView = () => {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <h1 className={`${titleFont.className} text-4xl mb-5`}>Ingresar</h1>

      <LoginForm />

      <DivisorLink
        link={{ text: 'Crear nueva cuenta', href: '/auth/new-account' }}
      />
    </div>
  );
};
