import { SupportWidget } from '@/components/support-widget';
import { Footer } from './footer';
import { Header } from './header';

type LayoutProps = React.PropsWithChildren;

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <SupportWidget /> {/* 👈 Add here */}
      <main className="mx-auto w-full max-w-screen-xl px-2 py-3 md:p-4">
        {children}
      </main>
      <Footer />
    </>
  );
}