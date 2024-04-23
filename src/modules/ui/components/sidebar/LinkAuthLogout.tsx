'use client';

import Link from 'next/link';
import { IoLogInOutline } from 'react-icons/io5';
import { useSidebarStore } from '../../store';
import { logout } from '@/modules/auth/actions';

export const LinkAuthLogOut = () => {
  const closeSideMenu = useSidebarStore((state) => state.closeSideMenu);

  const cleanLocalStorage = () => {
    localStorage.removeItem('shpoing-cart-storage');
    localStorage.removeItem('address-storage');
    localStorage.removeItem('__paypal_storage__');
  };
  const handleLogout = async () => {
    closeSideMenu();
    await logout();
    cleanLocalStorage();
    window.location.reload();
  };

  return (
    <Link
      href=""
      onClick={handleLogout}
      className="flex items-center px-2 py-4 hover:bg-gray-100 rounded transition-all hover:pl-8"
    >
      <IoLogInOutline size={30} />
      <span className="ml-3 text-xl">Salir</span>
    </Link>
  );
};
