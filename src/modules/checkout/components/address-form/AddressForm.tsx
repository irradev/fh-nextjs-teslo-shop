'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';

import { FormMessageError, TwCheckbox } from '@/modules/ui/components';
import { CheckoutAddress, Country } from '../../interfaces';
import { useAddressStore } from '../../store';
import { deleteUserAddressById, setUserAddress } from '../../actions';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type FormInputs = Omit<CheckoutAddress, 'rememberAddress | id'>;

interface Props {
  countries: Country[];
  userStoredAddress?: CheckoutAddress | null;
}

export const AddressForm = ({ countries, userStoredAddress }: Props) => {
  const router = useRouter();

  let dbAddress = {};
  let dbRememberAddress = false;

  if (userStoredAddress) {
    const { rememberAddress, ...rest } = userStoredAddress;
    dbAddress = rest;
    dbRememberAddress = rememberAddress;
  }

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormInputs>({
    defaultValues: {
      ...dbAddress,
    },
  });

  const { data: session } = useSession({
    required: true,
  });
  const savedAddress = useAddressStore((state) => state.address);
  const setAddress = useAddressStore((state) => state.setAddress);

  const [isChecked, setIsChecked] = useState(dbRememberAddress || false);
  const isFirstTime = useRef(false);

  const onSubmit = async (data: FormInputs) => {
    setAddress({
      ...data,
      rememberAddress: isChecked,
    });

    if (isChecked) {
      const res = await setUserAddress({
        address: data,
        userId: session!.user.id,
      });

      if (res.ok) {
        setAddress({
          ...data,
          id: res.address!.id,
          rememberAddress: isChecked,
        });
      }
    } else {
      // borrar address de bbdd
      if (savedAddress?.id) {
        const res = await deleteUserAddressById(savedAddress.id);
      }
    }

    router.push('/checkout');
  };

  useEffect(() => {
    if (savedAddress && !isFirstTime.current) {
      isFirstTime.current = true;
      const { rememberAddress, id, ...rest } = savedAddress;
      reset(rest);
      setIsChecked(savedAddress.rememberAddress);
    }
  }, [savedAddress]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2"
    >
      {/* + + + + + Input name + + + + + */}
      <div className=" flex flex-col min-h-24">
        <label htmlFor="name">Nombres</label>
        <input
          className={clsx('input-form mt-2', {
            '!border-red-500': errors.name,
          })}
          type="text"
          {...register('name', {
            required: 'El nombre es requerido',
          })}
        />

        {errors.name ? (
          <FormMessageError message={errors.name.message} />
        ) : null}
      </div>
      {/* + + + + + END Input Names + + + + + */}

      {/* + + + + + Input lastName + + + + + */}
      <div className=" flex flex-col min-h-24">
        <label htmlFor="name">Apelllidos</label>
        <input
          className={clsx('input-form mt-2', {
            '!border-red-500': errors.lastName,
          })}
          type="text"
          {...register('lastName', {
            required: 'Los apellidos son requeridos',
          })}
        />
        {errors.lastName ? (
          <FormMessageError message={errors.lastName.message} />
        ) : null}
      </div>
      {/* + + + + + END Input lastName + + + + + */}

      {/* + + + + + Input address + + + + + */}
      <div className=" flex flex-col min-h-24">
        <label htmlFor="name">Dirección</label>
        <input
          className={clsx('input-form mt-2', {
            '!border-red-500': errors.address,
          })}
          type="text"
          {...register('address', {
            required: 'La dirección es requerida',
          })}
        />
        {errors.address ? (
          <FormMessageError message={errors.address.message} />
        ) : null}
      </div>
      {/* + + + + + END Input address + + + + + */}

      {/* + + + + + Input address_second + + + + + */}
      <div className=" flex flex-col min-h-24">
        <label htmlFor="name">Dirección 2 (opcional)</label>
        <input
          className={clsx('input-form mt-2')}
          type="text"
          {...register('address_second')}
        />
      </div>
      {/* + + + + + END Input address_second + + + + + */}

      {/* + + + + + Input CP + + + + + */}
      <div className=" flex flex-col min-h-24">
        <label htmlFor="name">Códio Postal</label>
        <input
          className={clsx('input-form mt-2', {
            '!border-red-500': errors.zipCode,
          })}
          type="number"
          {...register('zipCode', {
            required: 'El código postal es requerido',
          })}
        />
        {errors.zipCode ? (
          <FormMessageError message={errors.zipCode.message} />
        ) : null}
      </div>
      {/* + + + + + END Input CP + + + + + */}

      {/* + + + + + Input CITY + + + + + */}
      <div className=" flex flex-col min-h-24">
        <label htmlFor="name">Ciudad</label>
        <input
          className={clsx('input-form mt-2', {
            '!border-red-500': errors.city,
          })}
          type="text"
          {...register('city', {
            required: 'La ciudad es requerida',
          })}
        />
        {errors.city ? (
          <FormMessageError message={errors.city.message} />
        ) : null}
      </div>
      {/* + + + + + END Input CITY + + + + + */}

      {/* + + + + + Input STATE + + + + + */}
      <div className=" flex flex-col min-h-24">
        <label htmlFor="name">Estado</label>
        <input
          className={clsx('input-form mt-2', {
            '!border-red-500': errors.state,
          })}
          type="text"
          {...register('state', {
            required: 'El estado es requerido',
          })}
        />
        {errors.state ? (
          <FormMessageError message={errors.state.message} />
        ) : null}
      </div>
      {/* + + + + + END Input STATE + + + + + */}

      {/* + + + + + Input COUNTRY + + + + + */}
      <div className=" flex flex-col min-h-24">
        <label htmlFor="name">País</label>
        {/* <input
          className={clsx('input-form mt-2', {
            '!border-red-500': errors.country,
          })}
          type="text"
          {...register('country', {
            required: 'El país es requerido',
          })}
          list="country-suggestions"
        />
        <datalist id="country-suggestions">
          {countries.map((country) => (
            <option
              key={country.id}
              value={country.name}
            >
              {country.id}
            </option>
          ))}
        </datalist> */}
        <select
          className={clsx('input-form mt-2', {
            '!border-red-500': errors.country,
          })}
          {...register('country', {
            required: 'El país es requerido',
          })}
        >
          {countries.map((country) => (
            <option
              key={country.id}
              value={country.name}
            >
              {country.name}
            </option>
          ))}
        </select>
        {errors.country ? (
          <FormMessageError message={errors.country.message} />
        ) : null}
      </div>
      {/* + + + + + END Input COUNTRY + + + + + */}

      {/* + + + + + Input PHONE + + + + + */}
      <div className=" flex flex-col min-h-24">
        <label htmlFor="name">Teléfono</label>
        <input
          className={clsx('input-form mt-2', {
            '!border-red-500': errors.phone,
          })}
          type="text"
          {...register('phone', {
            required: 'El teléfono es requerido',
          })}
        />

        {errors.phone ? (
          <FormMessageError message={errors.phone.message} />
        ) : null}
      </div>
      {/* + + + + + END Input PHONE + + + + + */}

      <div className="flex flex-col gap-4 col-span-2">
        <TwCheckbox
          isChecked={isChecked}
          onChange={setIsChecked}
          label="¿Recordar dirección?"
        />

        <button
          type="submit"
          className={clsx('flex w-full sm:w-1/2 justify-center', {
            'btn-primary': isValid,
            'btn-disabled': !isValid,
          })}
        >
          Siguiente
        </button>
      </div>
    </form>
  );
};
