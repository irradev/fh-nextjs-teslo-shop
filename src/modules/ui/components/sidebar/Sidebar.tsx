'use client';

import { useSession } from 'next-auth/react';
import { IoCloseOutline } from 'react-icons/io5';
import clsx from 'clsx';

import { useSidebarStore } from '../../store/sidebar-store';
import { SidebarInputSearch } from './SidebarInputSearch';
import { SidebarUserMenuList } from './sidebar-user-menu/SidebarUserMenuList';
import { SidebarAdminMenuList } from './sidebar-admin-menu/SidebarAdminMenuList';
import { LinkAuthLogOut } from './LinkAuthLogout';
import { LinkAuthLogIn } from './LinkAuthLogIn';

export const Sidebar = () => {
  const isSideMenuOpen = useSidebarStore((state) => state.isSideMenuOpen);
  const closeSideMenu = useSidebarStore((state) => state.closeSideMenu);

  const { data: session } = useSession();

  const isAuthenticated = !!session?.user;

  return (
    <div className="">
      {isSideMenuOpen ? (
        <div onClick={closeSideMenu}>
          {/* Mask */}
          <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"></div>

          {/* Blur */}
          <div className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"></div>
        </div>
      ) : null}

      {/* Sidemenu */}
      <nav
        //todo: efecto de slide
        className={clsx(
          'fixed p-5 right-0 top-0 w-full max-w-[500px] h-screen z-20 bg-white shadow-2xl transform transition-all duration-300',
          {
            'translate-x-0': isSideMenuOpen,
            'translate-x-full': !isSideMenuOpen,
          }
          // isSideMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <button
          onClick={closeSideMenu}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          <IoCloseOutline size={50} />
        </button>

        {/* Input search */}
        <SidebarInputSearch />

        {!isAuthenticated ? (
          <>
            {/* LogIn */}
            <LinkAuthLogIn />
          </>
        ) : (
          <>
            {/* User Menu */}
            <SidebarUserMenuList />
          </>
        )}

        {/* Admin menu */}
        {session?.user.role === 'admin' ? <SidebarAdminMenuList /> : null}

        {/* LogOut */}
        {isAuthenticated ? <LinkAuthLogOut /> : null}
      </nav>
    </div>
  );
};
