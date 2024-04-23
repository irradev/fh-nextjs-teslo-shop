import Link from 'next/link';
import { titleFont } from '@/config/fonts';
import { IoSearchOutline } from 'react-icons/io5';
import { ButtonMenu } from './ButtonMenu';
import { ButtonCart } from './ButtonCart';

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
          href="/genders/men"
        >
          Hombres
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/genders/women"
        >
          Mujeres
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/genders/kid"
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

        <ButtonCart />

        <ButtonMenu />
      </div>
    </nav>
  );
};
