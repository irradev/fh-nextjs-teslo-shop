import { notFound } from 'next/navigation';
import { titleFont } from '@/config/fonts';
import {
  ProductMobileSlideshow,
  ProductSlideshow,
  StockLabel,
} from './components';
import { getProductBySlug } from './actions';
import { AddToCartActions } from './components/add-to-cart-actions/AddToCartActions';

interface Props {
  slug: string;
}

export const ProductBySlugView = async ({ slug }: Props) => {
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3 md:px-5 ">
      {/* Slideshow */}
      <div className="col-span-1 md:col-span-2 ">
        {/* Mobile Slideshow */}
        <ProductMobileSlideshow
          title={product.title}
          images={product.images}
          className="block md:hidden"
        />

        {/* Desktop Slideshow */}
        <ProductSlideshow
          title={product.title}
          images={product.images}
          className="hidden md:block"
        />
      </div>

      {/* Detalles */}
      <div className="col-span-1 px-4 md:px-5 ">
        {/* stock */}
        <StockLabel productSlug={product.slug} />

        {/* title */}
        <h1
          className={` ${titleFont.className} antialiased font-bold text-xl mt-2`}
        >
          {product.title}
        </h1>

        {/* price */}
        <div className="flex gap-1 mb-5 mt-5 ">
          <p className="text-5xl font-light">${product.price}</p>
          <p className="text-2xl">USD</p>
        </div>

        {/* add to cart actions */}
        <AddToCartActions product={product} />

        {/* Descripción */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
};
