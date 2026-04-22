'use client'

import { useUserProfile } from '@/account/user-profile-hooks';
import { ChildFriendly } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useEffect, useState } from 'react';
import ProfileDrawer from "./profile";
import SignInWidget from "./signin";

// Re-export for backwards compatibility with existing imports.
export type { UserProfileProps } from '@/games/game-player-helpers';

const AGE_MODE_SEEN_KEY = 'age_mode_seen';

export default function AccountSwitch() {
  const { data: userProfile, isLoading } = useUserProfile();
  const [welcomeOpen, setWelcomeOpen] = useState(false);

  useEffect(() => {
    if (!userProfile) return;
    const ageMs = Date.now() - Date.parse(userProfile.dob);
    const isKidMode = ageMs < 13 * 365 * 24 * 3600 * 1000;
    if (isKidMode && !localStorage.getItem(AGE_MODE_SEEN_KEY)) {
      setWelcomeOpen(true);
    }
  }, [userProfile]);

  function handleWelcomeClose() {
    localStorage.setItem(AGE_MODE_SEEN_KEY, '1');
    setWelcomeOpen(false);
  }

  if (isLoading) {
    return <div />;
  }
  if (!userProfile) {
    return <SignInWidget />;
  }

  return (
    <div>
      <ProfileDrawer anchor="right" />
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
    </div>
  );
}
