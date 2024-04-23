import Link from 'next/link';
import React from 'react';
import { IoCardOutline } from 'react-icons/io5';

export interface OrderRowProps {
  orderId: string;
  isPaid: boolean;
  userFullName: string;
}

export const OrderRow = ({ orderId, isPaid, userFullName }: OrderRowProps) => {
  return (
    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {orderId.split('-').at(-1)}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {userFullName}
      </td>
      <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {isPaid ? (
          <>
            <IoCardOutline className="text-green-800" />
            <span className="mx-2 text-green-800">Pagada</span>
          </>
        ) : (
          <>
            <IoCardOutline className="text-red-800" />
            <span className="mx-2 text-red-800">No Pagada</span>
          </>
        )}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 ">
        <Link
          href={'/admin/orders/' + orderId}
          className="hover:underline"
        >
          Ver orden
        </Link>
      </td>
    </tr>
  );
};
