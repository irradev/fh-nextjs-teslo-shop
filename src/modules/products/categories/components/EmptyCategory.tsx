import Link from 'next/link';

export const EmptyCategory = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4 ">
      <span className="text-xl font-semibold">
        Lo sentimos. Por el momento no hay productos en esta categoría.
      </span>

      <Link
        href="/"
        className="text-blue-600 text-2xl hover:underline"
      >
        Regresar
      </Link>
    </div>
  );
};
