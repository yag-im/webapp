import { GA_ID } from "@/common/common-utils";
import { Layout } from '@/layout/layout';
import { BaseQueryClientProvider } from '@/query-client/base-query-client-provider';
import '@/styles/globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { GoogleAnalytics } from '@next/third-parties/google';
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
        <GoogleAnalytics gaId={GA_ID} />
      </body>
    </html>
  );
}
