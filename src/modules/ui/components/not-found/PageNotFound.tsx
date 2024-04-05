import { titleFont } from '@/config/fonts';
import Image from 'next/image';
import Link from 'next/link';

export const PageNotFound = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row min-h-[800px] w-full justify-center items-center align-middle pb-12 md:pb-0">
      <div className="flex flex-col items-center gap-1 tex-center px-5 mx-5">
        <p className="font-semibold text-3xl text-center ">Whoops!</p>
        <h2
          className={`${titleFont.className} antialiased text-9xl text-center`}
        >
          404
        </h2>
        <p className="font-semibold text-xl text-center">
          No encontramos lo que buscabas.
        </p>
        <p className="font-light mt-4 text-center">
          <span>Puedes regresar al </span>
          <Link
            href="/"
            className="font-normal hover:underline transition-all text-xl"
          >
            Inicio
          </Link>
        </p>
      </div>

      <div className="px-5 mx-5">
        <Image
          src="/imgs/starman_750x750.png"
          alt="404"
          className="p-5 sm:p-0"
          width={550}
          height={550}
        />
      </div>
    </div>
  );
};
