'use client';

import { titleFont } from '@/config/fonts';
import { getStockBySlug } from '../../actions';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

interface Props {
  productSlug: string;
}

export const StockLabel = ({ productSlug }: Props) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getStock = async () => {
    const inStock = await getStockBySlug(productSlug);
    setStock(inStock);
    setIsLoading(false);
  };

  useEffect(() => {
    getStock();
  }, []);

  return (
    <span
      className={clsx('block text-lg text-center py-1', titleFont.className, {
        'bg-gray-200 animate-pulse': isLoading,
        'font-light bg-red-400 text-gray-50 ': stock === 0 && !isLoading,
      })}
    >
      {isLoading ? <>&nbsp;</> : stock > 0 ? `${stock} Disponibles` : 'Agotado'}
    </span>
  );
};
