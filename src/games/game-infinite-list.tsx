'use client';

import { InfiniteScrollSentry } from '@/common/infinite-scroll-sentry';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import type { GameReleaseCardProps } from './game-card';
import { GameReleaseCard } from './game-card';
import { gameInfiniteListQueryOptions } from './game-infinite-list-query';
import { GameList } from './game-list';
import type { OrderBy } from './types';

export function GameInfiniteList() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword');
  const publisher = searchParams.get('publisher');
  const orderBy = searchParams.get('orderBy') as OrderBy;
  const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery(
    gameInfiniteListQueryOptions({ keyword, orderBy, publisher }),
  );

  return (
    <>
      {keyword && (
        <p>
          Search results for{' '}
          <span className="font-semibold">&quot;{keyword}&quot;</span>
        </p>
      )}
      <GameList>
        {data?.pages.map((page) => {
          return page.games?.results?.map((game: GameReleaseCardProps | null) => {
            if (!game) {
              return null;
            }

            return (
              <li key={game.id}>
                <GameReleaseCard {...game} />
              </li>
            );
          });
        })}
      </GameList>
      <InfiniteScrollSentry
        loading={isFetching}
        hasNextPage={hasNextPage}
        onLoadMore={fetchNextPage}
      />
    </>
  );
}
