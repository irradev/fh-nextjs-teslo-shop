'use client';

import { useState } from 'react';
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';

interface Props {
  quantity: number;
}

export const QuantitySelector = ({ quantity }: Props) => {
  const [count, setCount] = useState(quantity);

  const handleQuantityChange = (value: number) => {
    if (value < 1) value = 1;
    if (value > 5) value = 5;

    setCount(value);
  };

  return (
    <div className="flex w-full max-w-40">
      <button onClick={() => handleQuantityChange(count - 1)}>
        <IoRemoveCircleOutline size={30} />
      </button>
      <span className="flex-grow mx-3 px-5 bg-gray-100 rounded text-center text-lg">
        {count}
      </span>
      <button onClick={() => handleQuantityChange(count + 1)}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
