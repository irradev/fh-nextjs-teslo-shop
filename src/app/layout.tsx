import type { Metadata } from 'next';
import { inter } from '@/config/fonts';
import { SpeedInsights } from '@vercel/speed-insights/next';

import './globals.css';
import { LayoutProviders } from './LayoutProviders';

export const metadata: Metadata = {
  title: {
    template: '%s - Teslo | Shop',
    default: 'Home - Teslo | Shop',
  },
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
      <body className={`${inter.className} `}>
        <LayoutProviders>{children}</LayoutProviders>
        <SpeedInsights />
      </body>
    </html>
  );
}
