'use client'

import { useEffect, useState } from 'react';
import ProfileDrawer from "./profile";
import SignInWidget from "./signin";
import { getUserProfile } from '@/games/game-player-helpers';

export interface UserProfileProps {
  dob: string;
  email: string;
  name: string;
  tz: string;
}

export default function AccountSwitch() {
  const [userProfile, setUserProfile] = useState<UserProfileProps | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile();
        setUserProfile(profile);
      } catch (error) {
        setError(true);
      }
    };

    fetchUserProfile();
  }, []);

  if (error) {
    return <SignInWidget />;
  }
  return (
    <div>
      {userProfile ? (
        <ProfileDrawer anchor="right" userProfile={userProfile} />
      ) : (
        <SignInWidget />
      )}

    </div>
  );
}
