import prisma from '../lib/prisma';
import { initialData } from './seed';

async function main() {
  //1. Borrar registros previos

  // Este código causa error porque las tablas están relacionadas entre ellas
  // por lo que no se puede borrarlas en paralelo.
  // await Promise.all([
  //   prisma.productImage.deleteMany(),
  //   prisma.product.deleteMany(),
  //   prisma.category.deleteMany(),
  // ]);

  //1. Borrar registros previos
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  //2. Crear categorias
  await prisma.category.createMany({
    data: initialData.categories.map((category) => ({
      name: category.at(0)?.toUpperCase() + category.slice(1),
    })),
  });

  //3. Crear productos
  const categoriesDB = await prisma.category.findMany();
  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;

    return map;
  }, {} as Record<string, string>); //<string=label, string=categoryId>

  initialData.products.forEach(async (product) => {
    const { type, images, ...rest } = product;

    const productDB = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type.toLowerCase()],
      },
    });

    await prisma.productImage.createMany({
      data: images.map((image) => ({
        url: image,
        productId: productDB.id,
      })),
    });
  });

  console.log('Seed ejecutado correctamente');
}

(() => {
  if (process.env.NODE_ENV === 'production') return;

  main();
})();
