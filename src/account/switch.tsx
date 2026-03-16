'use client'

import { getUserProfile } from '@/games/game-player-helpers';
import { ChildFriendly } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useEffect, useState } from 'react';
import ProfileDrawer from "./profile";
import SignInWidget from "./signin";

export interface UserProfileProps {
  dob: string;
  email: string;
  name: string;
  tz: string;
}

const AGE_MODE_SEEN_KEY = 'age_mode_seen';

export default function AccountSwitch() {
  const [userProfile, setUserProfile] = useState<UserProfileProps | null>(null);
  const [error, setError] = useState(false);
  const [welcomeOpen, setWelcomeOpen] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile();
        setUserProfile(profile);
        const ageMs = Date.now() - Date.parse(profile.dob);
        const isKidMode = ageMs < 13 * 365 * 24 * 3600 * 1000;
        if (isKidMode && !localStorage.getItem(AGE_MODE_SEEN_KEY)) {
          setWelcomeOpen(true);
        }
      } catch (error) {
        setError(true);
      }
    };

    fetchUserProfile();
  }, []);

  function handleWelcomeClose() {
    localStorage.setItem(AGE_MODE_SEEN_KEY, '1');
    setWelcomeOpen(false);
  }

  if (error) {
    return <SignInWidget />;
  }
  return (
    <div>
      {userProfile ? (
        <>
          <ProfileDrawer anchor="right" userProfile={userProfile} />
          <Dialog open={welcomeOpen} onClose={handleWelcomeClose}>
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ChildFriendly fontSize="large" />
              Kid-Friendly Mode
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                This site operates in kid-friendly mode by default. Only age-appropriate content is shown. If you would like to see the full catalog, you can change the age mode in your profile by clicking the account icon in the upper right corner.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleWelcomeClose} variant="contained">Got it</Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <SignInWidget />
      )}

    </div>
  );
}
