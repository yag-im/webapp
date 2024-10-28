import { GA_ID } from "@/common/common-utils";
import { Layout } from '@/layout/layout';
import { BaseQueryClientProvider } from '@/query-client/base-query-client-provider';
import '@/styles/globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { GoogleAnalytics } from '@next/third-parties/google';
import { twJoin } from 'tailwind-merge';
import theme from '../theme';

type RootLayoutProps = React.PropsWithChildren;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={twJoin('min-h-screen flex flex-col')}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <BaseQueryClientProvider>
              <Layout>{children}</Layout>
            </BaseQueryClientProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
        <GoogleAnalytics gaId={GA_ID} />
      </body>
    </html>
  );
}
