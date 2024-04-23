import clsx from 'clsx';
import type { Size } from '../../interfaces';

interface Props {
  selectedSize?: Size;
  availableSizes: Size[];
  onSelectSize: (size: Size) => void;
}

export const SizeSelector = ({
  selectedSize,
  availableSizes,
  onSelectSize,
}: Props) => {
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Tallas disponibles</h3>
      <div className="flex">
        {availableSizes.map((size) => (
          <button
            key={size}
            onClick={() => onSelectSize(size)}
            className={clsx('mx-2 hover:underline transition-all', {
              underline: size === selectedSize,
              'text-lg text-gray-500 hover:text-black': size !== selectedSize,
              'text-2xl ': size === selectedSize,
            })}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
