'use client';

import { type ProductListType } from '@/modules/cart/interfaces';
import Link from 'next/link';
import { useAddressStore } from '../../../checkout/store/address.store';

interface Props {
  type: ProductListType;
}

export const SummaryUserAddress = ({ type }: Props) => {
  const userAddress = useAddressStore((state) => state.address);

  if (!userAddress) return null;

  return (
    <div className="flex flex-col gap-4 mb-10">
      <h2 className="text-2xl">Dirección de entrega</h2>

      <div className="flex flex-col gap-2 p-4 bg-blue-50 shadow-md rounded-md">
        <span className="font-semibold text-lg">
          {userAddress.name} {userAddress.lastName}
        </span>
        <div className="flex flex-wrap gap-2">
          <span>{userAddress.address}</span>
          {userAddress.address_second ? (
            <span>{userAddress.address_second}</span>
          ) : null}
          {/* <span>Col. Concordia</span> */}
          <span>{userAddress.city}</span>
        </div>
        <div className="flex gap-4">
          <span>
            {userAddress.state}, {userAddress.country}
          </span>
          <span>CP: {userAddress.zipCode}</span>
        </div>
        <span className="mt-2">Teléfono: {userAddress.phone}</span>
      </div>

      {type === 'checkout' ? (
        <div className="flex justify-end">
          <Link
            className="underline hover:text-blue-600 transition-colors"
            href="/checkout/address"
          >
            Cambiar dirección
          </Link>
        </div>
      ) : null}
    </div>
  );
};
