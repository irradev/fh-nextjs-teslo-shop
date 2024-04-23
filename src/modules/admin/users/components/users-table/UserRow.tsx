'use client';

import Link from 'next/link';
import React from 'react';
import { User } from '../../interface';
import clsx from 'clsx';
import { changeUserRol } from '../../actions';

export const UserRow = ({
  id,
  name,
  email,
  role,
  emailVerified,
  image,
}: User) => {
  const handleChangeRol = async (role: string) => {
    await changeUserRol(id, role);
  };

  return (
    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
      {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {id}
      </td>

      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {image ? (
          <Image
            src={image}
            alt={name}
            width={100}
            height={100}
            className="rounded object-cover"
          />
        ) : null}
      </td> */}

      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {email}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {name}
      </td>
      <td
        className={clsx(
          'text-sm font-light px-6 py-4 whitespace-nowrap',
          emailVerified ? 'text-green-800' : 'text-red-800'
        )}
      >
        {emailVerified ? 'Verificado' : 'No verificado'}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        <select
          value={role}
          onChange={(e) => handleChangeRol(e.target.value)}
          className="text-sm text-gray-900 w-full p-2 cursor-pointer border border-gray-300 rounded"
        >
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </td>
      <td className="text-sm text-gray-900 font-light px-6 ">
        <Link
          href={'/admin/users/' + id}
          className="hover:underline"
        >
          Ver usuario
        </Link>
      </td>
    </tr>
  );
};
