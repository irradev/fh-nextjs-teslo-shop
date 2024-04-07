import Link from 'next/link';
import { IoCartOutline } from 'react-icons/io5';

export const EmptyView = () => {
  return (
    <div className="flex justify-center items-center gap-4 h-[800px] ">
      <IoCartOutline
        size={100}
        className="text-gray-400 opacity-80"
      />
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-semibold text-gray-400">
          Tu carrito está vacío
        </h1>
        <Link
          href="/"
          className="text-blue-500 mt-2 text-4xl hover:underline"
        >
          Regresar
        </Link>
      </div>
    </div>
  );
};
