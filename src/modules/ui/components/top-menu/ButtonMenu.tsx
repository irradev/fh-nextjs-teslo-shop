'use client';

import { IoMenuOutline } from 'react-icons/io5';
import { useSidebarStore } from '../../store';

export const ButtonMenu = () => {
  const openSideMenu = useSidebarStore((state) => state.openSideMenu);

  return (
    <button
      onClick={openSideMenu}
      className="ml-2 p-2 rounded-full transition-all hover:bg-gray-100"
    >
      <IoMenuOutline className="w-5 h-5" />
    </button>
  );
};
