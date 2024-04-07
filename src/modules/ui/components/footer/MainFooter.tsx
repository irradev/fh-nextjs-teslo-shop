import { titleFont } from '@/config/fonts';
import Link from 'next/link';

export const MainFooter = () => {
  return (
    <div className="main-px w-full flex flex-col items-center md:flex-row justify-center gap-4 text-xs h-16  ">
      <NavLink href="/">
        <span className={`${titleFont.className} font-bold antialiased`}>
          Testlo
        </span>
        <span> | Shop</span>
        <span>© {new Date().getFullYear()}</span>
      </NavLink>
      <NavLink href="/blog">Blog</NavLink>
      <NavLink href="/faq">FAQ</NavLink>
      <NavLink href="/contact-us">Contacto</NavLink>
      <NavLink href="/about-us">Sobre Nosotros</NavLink>
      <NavLink href="/terms-and-conditions">Términos y Condiciones</NavLink>
      <NavLink href="/privacy-policy">Política de privacidad</NavLink>
    </div>
  );
};

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="font-light hover:underline transition-all"
    >
      {children}
    </Link>
  );
}
