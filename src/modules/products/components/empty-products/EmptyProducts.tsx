import Link from 'next/link';

interface Props {
  message?: string;
  href?: string;
  hrefText?: string;
}

export const EmptyProducts = ({
  message = 'Lo sentimos. Por el momento no hay productos disponibles.',
  href = '/',
  hrefText = 'Regresar',
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4 ">
      <span className="text-xl font-semibold">{message}</span>

      <Link
        href={href}
        className="text-blue-600 text-2xl hover:underline"
      >
        {hrefText}
      </Link>
    </div>
  );
};
