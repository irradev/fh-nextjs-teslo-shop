'use client';

import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';
import { IoAlertCircleOutline, IoLogInOutline } from 'react-icons/io5';

import { authenticate } from '../../actions';
import clsx from 'clsx';

export const LoginForm = () => {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <form
      action={dispatch}
      className="flex flex-col"
    >
      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        name="email"
        type="email"
      />

      <label htmlFor="password">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        name="password"
        type="password"
      />

      <LoginButton />

      {errorMessage && (
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          <>
            <IoAlertCircleOutline className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        </div>
      )}
    </form>
  );
};

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={clsx(
        'flex justify-center items-center gap-2 transition-colors',
        {
          'btn-primary': !pending,
          'btn-disabled': pending,
        }
      )}
      aria-disabled={pending}
      disabled={pending}
    >
      Ingresar{' '}
      <IoLogInOutline
        className={clsx('h-5 w-5 ', {
          'text-gray-50': !pending,
          'text-gray-400': pending,
        })}
      />
    </button>
  );
}
