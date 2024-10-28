import { getMetadata } from '@/seo/seo-utils';
import type { Viewport } from 'next';
import GamesPage from './games/page';

export const metadata = getMetadata({
  title: 'Main',
  pathname: '/'
});

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width'
}

export default function Main() {
  return (
    <>
      <h1 className="sr-only">Main</h1>
      <GamesPage searchParams={{
        keyword: undefined,
        orderBy: undefined
      }}></GamesPage>
    </>
  );
}
