'use client';
import { useState } from 'react';
import Image from 'next/image';

interface Props {
  images: string[];
  title: string;
}

export const ProductGridImage = ({ images, title }: Props) => {
  const [displayImage, setDisplayImage] = useState(images[0]);

  return (
    <Image
      loading="lazy"
      src={`/products/${displayImage}`}
      alt={title}
      className="w-full object-cover rounded z-0"
      width={500}
      height={500}
      onMouseEnter={() => setDisplayImage(images[1])}
      onMouseLeave={() => setDisplayImage(images[0])}
    />
  );
};
