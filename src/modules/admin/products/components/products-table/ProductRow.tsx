import { ProductImage } from '@/modules/products/components';
import { Product } from '@/modules/products/interfaces';
import { currencyFormat } from '@/utils';
import Link from 'next/link';
import React from 'react';

export interface Props {
  product: Product;
}

export const ProductRow = ({ product }: Props) => {
  return (
    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        <Link href={`/admin/products/${product.slug}`}>
          <ProductImage
            src={product.images[0]}
            alt={product.title}
            width={80}
            height={80}
            className="w-20 h-20 object-cover rounded"
          />
        </Link>
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        <Link
          href={`/admin/products/${product.slug}`}
          className="hover:underline"
        >
          {product.title}
        </Link>
      </td>
      <td className="text-sm font-bold text-gray-900  px-6 py-4 whitespace-nowrap">
        {currencyFormat(product.price)}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {product.gender}
      </td>
      <td className="text-sm font-bold text-gray-900 px-6 py-4 whitespace-nowrap">
        {product.inStock}
      </td>
      <td className="text-sm font-light text-gray-900 px-6 py-4 whitespace-nowrap">
        {product.sizes.join(', ')}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 ">
        <Link
          href={'/admin/products/' + product.slug}
          className="hover:underline"
        >
          Editar producto
        </Link>
      </td>
    </tr>
  );
};
