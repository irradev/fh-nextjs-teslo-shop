import Link from 'next/link';

interface Props {
  link: {
    text: string;
    href: string;
  };
}

export const DivisorLink = ({ link }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center mt-12 gap-4">
      <div className="flex items-center w-full">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link
        href={link.href}
        className="btn-secondary text-center w-full border border-gray-400"
      >
        {link.text}
      </Link>
    </div>
  );
};
