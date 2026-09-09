import { UserProfileTabSync } from '@/account/user-profile-tab-sync';
import { ADSENSE_CLIENT_ID, ADSENSE_HEADER_SLOT, APP_ENV } from '@/common/common-utils';
import { Footer } from './footer';
import { Header } from './header';

type LayoutProps = React.PropsWithChildren;

export function Layout({ children }: LayoutProps) {
  const adsenseMock = APP_ENV === 'dev';

  return (
    <div className="flex min-h-screen flex-col">
      <UserProfileTabSync />
      <Header adsenseClient={ADSENSE_CLIENT_ID} adsenseSlot={ADSENSE_HEADER_SLOT} adsenseMock={adsenseMock} />
      <main
        className="mx-auto w-full max-w-screen-xl flex-1 px-3 py-4 md:px-6 md:py-6"
        style={{ paddingBottom: 'calc(var(--footer-height, 64px) + 1rem)' }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}