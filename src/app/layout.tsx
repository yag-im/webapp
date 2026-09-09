import { ADSENSE_CLIENT_ID, APP_ENV, GA_ID } from "@/common/common-utils";
import { Layout } from '@/layout/layout';
import { BaseQueryClientProvider } from '@/query-client/base-query-client-provider';
import '@/styles/globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';
import { twJoin } from 'tailwind-merge';
import { ColorModeProvider } from '../theme-provider';

type RootLayoutProps = React.PropsWithChildren;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={twJoin('min-h-screen flex flex-col')}>
        <AppRouterCacheProvider>
          <ColorModeProvider>
            <BaseQueryClientProvider>
              <Layout>{children}</Layout>
            </BaseQueryClientProvider>
          </ColorModeProvider>
        </AppRouterCacheProvider>
        {APP_ENV !== 'dev' && /^ca-pub-/i.test(ADSENSE_CLIENT_ID) && (
          <Script
            id="adsbygoogle-loader"
            async
            crossOrigin="anonymous"
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          />
        )}
        {/^G-/i.test(GA_ID) && <GoogleAnalytics gaId={GA_ID} />}
      </body>
    </html>
  );
}
