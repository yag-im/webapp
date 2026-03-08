import { Footer } from './footer';
import { Header } from './header';

type LayoutProps = React.PropsWithChildren;

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-screen-xl flex-1 px-2 py-3 md:p-4">
        {children}
      </main>
      <Footer />
    </div>
  );
}