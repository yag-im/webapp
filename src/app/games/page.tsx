import { gameInfiniteListQueryOptions } from '@/app/queries/game-infinite-list';
import { Card, CardContent, CardTitle } from '@/common/card';
import { GameInfiniteList } from '@/games/game-infinite-list';
import { GameSearchForm } from '@/games/game-search-form';
import type { OrderBy } from '@/games/types';
import { getQueryClient } from '@/query-client/query-client-utils';
import { getMetadata } from '@/seo/seo-utils';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = getMetadata({
  title: 'Games Catalog',
  description: 'Games Catalog',
  pathname: '/games',
});

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width'
}

type GamesPageProps = {
  searchParams: {
    keyword?: string;
    orderBy?: OrderBy;
  };
};

export default async function GamesPage({
  searchParams: { keyword, orderBy },
}: GamesPageProps) {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery(
    gameInfiniteListQueryOptions({ keyword: keyword ?? null, orderBy: orderBy ?? null }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Card withTitle>
        <CardTitle as="h1">Games Catalog</CardTitle>
        <CardContent>
          <GameSearchForm />
          <GameInfiniteList />
        </CardContent>
      </Card>
    </HydrationBoundary>
  );
}
