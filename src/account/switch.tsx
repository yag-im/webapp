import { API_URL } from '@/common/common-utils';
import { getQueryClient } from "@/query-client/query-client-utils";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from 'next/headers';
import ProfileDrawer from "./profile";
import SignInWidget from "./signin";

export interface UserProfileProps {
  dob: string;
  email: string;
  name: string;
  tz: string;
}

export default async function AccountSwitch() {
  const queryClient = getQueryClient();
  const userProfile: UserProfileProps = await queryClient.fetchQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const fetchHeaders = new Headers();
      if (headers().has('cookie')) {
        fetchHeaders.append('cookie', headers().get('cookie')!);
      }
      const response = await fetch(`${API_URL}/accounts/user`, { headers: fetchHeaders });
      if (!response.ok) {
        return null;
      }
      const response_json = await response.json() as UserProfileProps;
      return response_json;
    },
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        {userProfile ? (
          <ProfileDrawer anchor="right" userProfile={userProfile} />
        ) : (
          <SignInWidget />
        )}

      </div>
    </HydrationBoundary>
  );
}
