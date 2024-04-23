'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import clsx from 'clsx';

import { login, registerUser } from '../../actions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormMessageError } from '@/modules/ui/components';

type FormIinputs = {
  name: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormIinputs>();

  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit: SubmitHandler<FormIinputs> = async (data) => {
    setErrorMessage('');

    // Server action
    const resp = await registerUser({
      name: data.name,
      email: data.email.toLowerCase(),
      password: data.password,
    });

    if (!resp.ok) {
      setErrorMessage(resp.message);

      return;
    }

    // console.log(resp);

    const respLogin = await login(data.email.toLowerCase(), data.password);

    if (!respLogin.ok) {
      setErrorMessage(respLogin.message);
      router.replace('/auth/login');
    }

    router.refresh();
  };

  return (
    <form
      className="flex flex-col "
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="min-h-28">
        <label htmlFor="name">Nombre completo</label>
        <input
          className={clsx('input-form', {
            '!border-red-500': errors.name,
          })}
          type="text"
          autoFocus
          {...register('name', {
            required: 'El nombre es requerido',
          })}
        />
        {errors.name ? (
          <FormMessageError message={errors.name.message} />
        ) : null}
      </div>

      <div className="min-h-28">
        <label htmlFor="email">Correo electrónico</label>
        <input
          className={clsx('input-form', {
            '!border-red-500': errors.email,
          })}
          type="email"
          {...register('email', {
            required: 'El correo es requerido',
            pattern: {
              value: /^[^\.\s][\w\-]+(\.[\w\-]+)*@([\w-]+\.)+[\w-]{2,}$/gm,
              message: 'El correo no es valido',
            },
          })}
        />
        {errors.email ? (
          <FormMessageError message={errors.email.message} />
        ) : null}
      </div>

      <div className="min-h-28">
        <label htmlFor="password">Contraseña</label>
        <input
          className={clsx('input-form', {
            '!border-red-500': errors.password,
          })}
          type="password"
          {...register('password', {
            required: 'La contraseña es requerida',
            minLength: {
              value: 6,
              message: 'La contraseña debe tener al menos 6 caracteres',
            },
          })}
        />
        {errors.password ? (
          <FormMessageError message={errors.password.message} />
        ) : null}
      </div>

      {errorMessage ? (
        <div className="bg-red-400 text-white text-center px-2 py-2">
          {errorMessage}
        </div>
      ) : null}

      <button className="btn-primary mt-2">Crear cuenta</button>
    </form>
  );
};
