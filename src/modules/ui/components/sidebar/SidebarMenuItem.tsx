import Link from 'next/link';

interface Props {
  title: string;
  href: string;
  icon: React.ReactNode;
}
export const SidebarMenuItem = ({ title, href, icon }: Props) => {
  return (
    <Link
      href={href}
      className="flex items-center px-2 py-4 hover:bg-gray-100 rounded transition-all hover:pl-8"
    >
      {icon}
      <span className="ml-3 text-xl">{title}</span>
    </Link>
  );
};
