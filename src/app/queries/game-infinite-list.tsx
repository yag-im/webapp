import { API_URL } from '@/common/common-utils';
import type { OrderBy } from '@/games/types';
import { infiniteQueryOptions } from '@tanstack/react-query';
import { headers } from 'next/headers';

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
        body: JSON.stringify({ ...data }),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      };
      // we need to supply cookie in a server-side fetch in order to populate current_user in webapi (to check kids mode)    
      if (headers().has('cookie')) {
        requestOptions.headers.append('cookie', headers().get('cookie')!);
      }
      //console.log(requestOptions);
      const response = await fetch(`${API_URL}/apps/search`, requestOptions);
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
