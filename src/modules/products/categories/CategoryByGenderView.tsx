import { Title } from '@/modules/ui/components';
import { initialData } from '@/seed/seed';
import { ProductGrid } from '@/modules/products/components';

import { EmptyCategory } from './components/EmptyCategory';
import { Gender } from '../interfaces';
import { notFound } from 'next/navigation';

interface Props {
  gender: Gender;
}

export const CategoryByGenderView = ({ gender }: Props) => {
  const products = initialData.products.filter(
    (product) => product.gender === gender
  );

  const labels: Record<Gender, string> = {
    men: 'para Hombres',
    women: 'para Mujeres',
    kid: 'para Niños',
    unisex: 'Unisex',
  };

  if (!labels[gender]) notFound();

  return (
    <>
      <section
        id="products-by-gender"
        className="main-px"
      >
        <Title
          title={`Productos ${labels[gender]}`}
          // subtitle={`Productos para ${labels[gender]}`}
          className="mb-2"
        />
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <EmptyCategory />
        )}
      </section>
    </>
  );
};
