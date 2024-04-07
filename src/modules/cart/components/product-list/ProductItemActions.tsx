'use client';

import { QuantitySelector } from '@/modules/products/components';
import { IoSaveOutline, IoTrashOutline } from 'react-icons/io5';

interface Props {
  productId: string;
  quantity: number;
}
export const ProductItemActions = ({ productId, quantity }: Props) => {
  const handleRemove = () => {
    console.log('remove', productId);
  };
  const handleSave = () => {
    console.log('save', productId);
  };
  return (
    <div className="flex flex-col items-start gap-4">
      <QuantitySelector quantity={quantity} />

      <div className="flex flex-wrap items-center mt-4 lg:mt-0 gap-8">
        <button
          onClick={handleRemove}
          className="flex items-center gap-2 underline hover:text-red-400 transition-colors"
        >
          <IoTrashOutline size={18} />
          Remover
        </button>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 underline hover:text-blue-600 transition-colors"
        >
          <IoSaveOutline size={18} />
          Guardar
        </button>
      </div>
    </div>
  );
};
