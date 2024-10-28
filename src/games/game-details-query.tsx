import { API_URL } from "@/common/common-utils";
import { getQueryClient } from "@/query-client/query-client-utils";
import type { GameReleaseDetailsProps } from "./game-details";

export async function getGameDetails(appReleaseUuid: string) {
  const queryClient = getQueryClient();
  let api_url;
  if (typeof window === 'undefined') {
    // server-side fetch
    api_url = `${API_URL}/apps/${appReleaseUuid}`;
  } else {
    // client-side fetch
    api_url = `/api/apps/${appReleaseUuid}`;
  }
  const gameDetails: GameReleaseDetailsProps = await queryClient.fetchQuery({
    queryKey: ['game', appReleaseUuid],
    queryFn: async () => {
      const response = await fetch(api_url);
      if (!response.ok) {
        return null;
      }
      const response_json = await response.json() as GameReleaseDetailsProps;
      return response_json;
    },
  });
  return { gameDetails };
}
