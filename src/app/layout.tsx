import type { Metadata } from 'next';
import { inter } from '@/config/fonts';

import './globals.css';

export const metadata: Metadata = {
  title: 'Teslo | Shop',
  description: 'Una tienda virtual de productos',
};

//#region RootLayout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        {children}
      </body>
    </html>
  );
}