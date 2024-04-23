'use client';

import { useCartStore } from '@/modules/cart/store';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IoCartOutline } from 'react-icons/io5';

export const ButtonCart = () => {
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <Link
      href="/cart"
      className="p-2 rounded-full transition-all hover:bg-gray-100"
    >
      <div className="relative ">
        {isLoaded && totalItemsInCart > 0 ? (
          <span className="fade-in text-xs text-white font-bold bg-blue-700  rounded-full px-1 absolute -top-3 -right-3">
            {totalItemsInCart}
          </span>
        ) : null}
        <IoCartOutline className="w-5 h-5" />
      </div>
    </Link>
  );
};
