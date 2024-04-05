import { initialData } from '@/seed/seed';
import { Title } from '@/modules/ui/components';
import { ProductGrid } from '@/modules/products/components';

const products = initialData.products;

export const HomeView = () => {
  return (
    <>
      <section
        id="products"
        className="main-px"
      >
        <Title
          title="Tienda"
          subtitle="Todos los productos"
          className="mb-2"
        />

        <ProductGrid products={products} />
      </section>
    </>
  );
};
