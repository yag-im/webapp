import { infiniteQueryOptions } from '@tanstack/react-query';
import type { OrderBy } from './types';

const FIRST_PAGE = 0;
const LIMIT_PAGE = 25;

// https://tanstack.com/query/v5/docs/react/typescript#typing-query-options
export function gameInfiniteListQueryOptions({ keyword, orderBy, publisher }: { keyword: string | null, orderBy: OrderBy | null, publisher?: string | null }) {
  return infiniteQueryOptions({
    initialPageParam: FIRST_PAGE,
    queryKey: ['games', keyword || '', orderBy || '', publisher || ''],
    queryFn: async ({ pageParam }) => {
      const data: any = {
        offset: pageParam * LIMIT_PAGE,
        limit: LIMIT_PAGE,
        ...(orderBy ? { order_by: orderBy } : {}),
      };

      if (keyword) data.app_name = keyword;
      if (publisher) data.publisher_name = publisher;
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data })
      };
      //console.log(requestOptions);
      const response = await fetch("/api/apps/search", requestOptions);
      if (!response.ok) {
        // console.log(response);
        return {};
      }
      const response_json = await response.json();
      if (response_json.apps?.length === 0) {
        return {};
      }
      return {
        games: {
          info: {
            next: pageParam + 1
          },
          results: response_json.apps,
        }
      };
    },
    getNextPageParam: (lastPage) => lastPage.games?.info.next,
  });
}
