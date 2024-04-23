'use client';

import Link from 'next/link';
import { IoLogInOutline } from 'react-icons/io5';
import { useSidebarStore } from '../../store';

export const LinkAuthLogIn = () => {
  const closeSideMenu = useSidebarStore((state) => state.closeSideMenu);

  return (
    <Link
      href="/auth/login"
      onClick={closeSideMenu}
      className="flex items-center px-2 py-4 hover:bg-gray-100 rounded transition-all hover:pl-8"
    >
      <IoLogInOutline size={30} />
      <span className="ml-3 text-xl">Ingresar</span>
    </Link>
  );
};
