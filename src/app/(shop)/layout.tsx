import { Sidebar, TopMenu } from '@/modules/ui/components';
import { MainFooter } from '@/modules/ui/components/footer/MainFooter';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="main-max-w flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 shadow-md">
        <TopMenu />
      </header>
      <Sidebar />
      <main className="flex-grow">{children}</main>
      <footer>
        <MainFooter />
      </footer>
    </div>
  );
}
