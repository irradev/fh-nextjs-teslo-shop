import { titleFont } from '@/config/fonts';
import Link from 'next/link';
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5';
import { MenuButton } from './MenuButton';

export const TopMenu = () => {
  return (
    <nav className="flex main-px py-2 justify-between items-center w-full bg-white">
      {/* Logo */}
      <div className="">
        <Link href="/">
          <span
            className={`
              ${titleFont.className} antialiased font-bold
            `}
          >
            Testlo
          </span>
          <span> | Shop</span>
        </Link>
      </div>

      {/* Center menu */}
      <div className="hidden sm:block">
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/category/men"
        >
          Hombres
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/category/women"
        >
          Mujeres
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/category/kid"
        >
          Niños
        </Link>
      </div>

      {/* Search, Cart, Menu */}
      <div className="flex items-center gap-2">
        <Link
          href="/search"
          className="p-2 rounded-full transition-all hover:bg-gray-100"
        >
          <IoSearchOutline className="w-5 h-5" />
        </Link>

        <Link
          href="/cart"
          className="p-2 rounded-full transition-all hover:bg-gray-100"
        >
          <div className="relative ">
            <span className="text-xs text-white font-bold bg-blue-700  rounded-full px-1 absolute -top-3 -right-3">
              3
            </span>
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>

        <MenuButton />
      </div>
    </nav>
  );
};
