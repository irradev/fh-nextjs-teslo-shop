import Image from 'next/image';
import React from 'react';

interface Props {
  src?: string;
  alt: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>['className'];
  width: number;
  height: number;
}

export const ProductImage = ({
  src,
  alt,
  className = 'w-20 h-20 object-cover rounded',
  width,
  height,
}: Props) => {
  const localSrc = src
    ? src.startsWith('http')
      ? src
      : '/products/' + src
    : '/imgs/placeholder.jpg';

  return (
    <Image
      src={localSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};
