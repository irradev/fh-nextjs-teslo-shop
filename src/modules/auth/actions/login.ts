'use server';

import { AuthError } from 'next-auth';
import { signIn } from '@/auth.config';
// import { sleep } from '@/utils';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    // await sleep(2);

    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Las credenciales no son correctas.';
        default:
          return 'Algo salió mal.';
      }
    }
    throw error;
  }
}

export const login = async (email: string, password: string) => {
  try {
    await signIn('credentials', { email, password });

    return {
      ok: true,
      message: 'Sesión iniciada con exito.',
    };
  } catch (error) {
    console.log(error);

    let messageError = '';

    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          messageError = 'Las credenciales no son correctas.';
        default:
          messageError = 'No se pudo iniciar sesión.';
      }
    }

    return {
      ok: false,
      message: messageError,
    };
  }
};
