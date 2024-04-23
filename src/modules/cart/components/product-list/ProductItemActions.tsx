'use client';

import { QuantitySelector } from '@/modules/products/components';
import { IoSaveOutline, IoTrashOutline } from 'react-icons/io5';
import { useCartStore } from '../../store';
import { CartProduct, Product, Size } from '@/modules/products/interfaces';
import { useState } from 'react';
import { ModalConfirm } from '@/modules/ui/components/modals/ModalConfirm';

interface Props {
  product: CartProduct;
}
export const ProductItemActions = ({ product }: Props) => {
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );

  const removeProductFromCart = useCartStore(
    (state) => state.removeProductFromCart
  );

  const [isOpenRemoveModal, setIsOpenRemoveModal] = useState(false);

  const handleSelectedQuantity = (quantity: number) => {
    updateProductQuantity(product.id, quantity, product.size);
  };

  const handleRemove = () => {
    removeProductFromCart(product);
    closeModal();
  };
  const handleSave = () => {
    console.log('save', product.id);
  };

  const closeModal = () => {
    setIsOpenRemoveModal(false);
  };

  return (
    <div className="flex flex-col items-start gap-4">
      <QuantitySelector
        quantity={product.quantity}
        onSelectQuantity={handleSelectedQuantity}
      />

      <div className="flex flex-wrap items-center mt-4 lg:mt-0 gap-8">
        <button
          onClick={() => setIsOpenRemoveModal(true)}
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

      <ModalConfirm
        isOpen={isOpenRemoveModal}
        onConfirm={handleRemove}
        onClose={closeModal}
        onCancel={closeModal}
        title="Remover producto"
      >
        <p>¿Estas seguro de querer remover este producto de tu carrito?</p>
        <p className="mt-2 text-lg font-bold">
          {product.size} - {product.title}
        </p>
      </ModalConfirm>
    </div>
  );
};
