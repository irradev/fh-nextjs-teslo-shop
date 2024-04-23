'use client';

import { useState } from 'react';
import { useCartStore } from '@/modules/cart/store';
import { Product, Size } from '../../interfaces';
import { SizeSelector } from './SizeSelector';
import { QuantitySelector } from './QuantitySelector';

interface Props {
  product: Product;
}

export const AddToCartActions = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const [selectedSize, setSelectedSize] = useState<Size | undefined>();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isPosted, setIsPosted] = useState(false);

  const addToCard = () => {
    setIsPosted(true);

    if (!selectedSize) {
      return;
    }

    addProductToCart({
      id: product.id,
      title: product.title,
      size: selectedSize,
      quantity: selectedQuantity,
      price: product.price,
      slug: product.slug,
      image: product.images[0],
    });

    // reset states
    setIsPosted(false);
    setSelectedQuantity(1);
    setSelectedSize(undefined);
  };

  return (
    <>
      {isPosted && !selectedSize ? (
        <span className="mt-2 text-red-500 fade-in">
          Debe seleccionar una talla
        </span>
      ) : null}
      {/* selector de tallas */}
      <SizeSelector
        selectedSize={selectedSize}
        availableSizes={product.sizes}
        onSelectSize={setSelectedSize}
      />

      {/* selector de cantidad */}
      {product.inStock > 0 ? (
        <QuantitySelector
          quantity={selectedQuantity}
          onSelectQuantity={setSelectedQuantity}
        />
      ) : null}

      {/* Button */}
      {product.inStock > 0 ? (
        <button
          onClick={addToCard}
          className="btn-primary my-5"
        >
          Agregar al carrito
        </button>
      ) : null}
    </>
  );
};
