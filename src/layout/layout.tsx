import { UserProfileTabSync } from '@/account/user-profile-tab-sync';
import { Footer } from './footer';
import { Header } from './header';

type LayoutProps = React.PropsWithChildren;

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <UserProfileTabSync />
      <Header />
      <main className="mx-auto w-full max-w-screen-xl flex-1 px-3 py-4 md:px-6 md:py-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}