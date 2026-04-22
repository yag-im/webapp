'use client'

import { AccountCircleOutlined, AddTask, ChildFriendly, DarkMode, Feedback, LightMode, Logout, Mail } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, ListSubheader, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';
import _ from 'lodash';
import moment from 'moment';
import * as React from 'react';
import { useColorMode } from '../theme-provider';
import type { UserProfileProps } from './switch';

type AgeMode = 'kid' | 'teen' | 'adult';

function getAgeMode(dob: number): AgeMode {
  const now = Date.now();
  const ageMs = now - dob;
  const kidMaxMs = 13 * 365 * 24 * 3600 * 1000;
  const teenMaxMs = 18 * 365 * 24 * 3600 * 1000;
  if (ageMs < kidMaxMs) return 'kid';
  if (ageMs < teenMaxMs) return 'teen';
  return 'adult';
}

function ageModeToDate(mode: AgeMode): string {
  const now = new Date();
  switch (mode) {
    case 'kid': return moment(now).format('YYYY-MM-DD');
    case 'teen': return moment(new Date(now.getTime() - 15 * 365 * 24 * 3600 * 1000)).format('YYYY-MM-DD');
    case 'adult': return '1970-01-01';
  }
}

const TruncatedListItemText = styled(ListItemText)(({ }) => ({
  '& .MuiTypography-root': {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '@media (max-width:3200px)': {
    },
  },
}));

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function ProfileDrawer({ anchor, userProfile }: { anchor: Anchor, userProfile: UserProfileProps }) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [ageMode, setAgeMode] = React.useState<AgeMode>(getAgeMode(Date.parse(userProfile.dob)));
  const [adultConfirmOpen, setAdultConfirmOpen] = React.useState(false);
  const updUserProfile = React.useRef<UserProfileProps | null>(null);
  const theme = useTheme();
  const { mode: colorMode, setColorMode } = useColorMode();

  React.useEffect(() => {
    updUserProfile.current = structuredClone(userProfile);
  }, []);

  function applyAgeMode(mode: AgeMode) {
    setAgeMode(mode);
    if (updUserProfile.current) { updUserProfile.current.dob = ageModeToDate(mode); }
  }

  function handleAgeModeChange(_event: React.MouseEvent<HTMLElement>, newMode: AgeMode | null) {
    if (newMode === null) return;
    if (newMode === 'adult') {
      setAdultConfirmOpen(true);
      return;
    }
    applyAgeMode(newMode);
  }

  function handleAdultConfirm() {
    setAdultConfirmOpen(false);
    applyAgeMode('adult');
  }

  function handleAdultCancel() {
    setAdultConfirmOpen(false);
  }

  const updateUser = async (updatedUserProfile: UserProfileProps) => {
    const response = await fetch("/api/accounts/user", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUserProfile),
    });

    if (!response.ok) {
      throw new Error('Failed to update user profile');
    }
    return;
  };

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      async (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        if (!open && updUserProfile.current && (!_.isEqual(updUserProfile.current, userProfile))) {
          await updateUser(updUserProfile.current);
          if (getAgeMode(Date.parse(updUserProfile.current.dob)) !== getAgeMode(Date.parse(userProfile.dob))) { window.location.reload(); }
        }

        setState({ ...state, [anchor]: open });
      };

  const list = (anchor: Anchor) => (
    <Box
      sx={{
        width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 320
      }}
      role="presentation"
    >
      <Box p={2}>
        <Typography variant="h6" gutterBottom>Account information</Typography>
      </Box>

      <Divider />

      <List>
        <ListSubheader>Profile</ListSubheader>


        <ListItem key='UserEmail' >
          <ListItemButton
            disableRipple
            sx={{
              cursor: 'default',
              '&:hover': { backgroundColor: 'transparent' },
              '&:focus': { outline: 'none' }
            }}
          >
            <ListItemIcon>
              <Mail />
            </ListItemIcon>
            <TruncatedListItemText primary={userProfile.email || userProfile.name} />
          </ListItemButton>
        </ListItem>

        <ListItem key='AgeMode'>
          <ListItemButton
            disableRipple
            sx={{
              cursor: 'default',
              '&:hover': { backgroundColor: 'transparent' },
              '&:focus': { outline: 'none' },
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 1,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ListItemIcon>
                <ChildFriendly />
              </ListItemIcon>
              <ListItemText primary='Age Mode' />
            </Box>
            <ToggleButtonGroup
              value={ageMode}
              exclusive
              onChange={handleAgeModeChange}
              size="small"
              fullWidth
              sx={{ pl: 2 }}
            >
              <ToggleButton value="kid">Kid</ToggleButton>
              <ToggleButton value="teen">Teen</ToggleButton>
              <ToggleButton value="adult">Adult</ToggleButton>
            </ToggleButtonGroup>
          </ListItemButton>
        </ListItem>

        <ListItem key='Appearance'>
          <ListItemButton
            disableRipple
            sx={{
              cursor: 'default',
              '&:hover': { backgroundColor: 'transparent' },
              '&:focus': { outline: 'none' },
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 1,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ListItemIcon>
                {colorMode === 'dark' ? <DarkMode /> : <LightMode />}
              </ListItemIcon>
              <ListItemText primary='Appearance' />
            </Box>
            <ToggleButtonGroup
              value={colorMode}
              exclusive
              onChange={(_event, newMode) => {
                if (newMode === 'light' || newMode === 'dark') {
                  setColorMode(newMode);
                }
              }}
              size="small"
              fullWidth
              sx={{ pl: 2 }}
            >
              <ToggleButton value="light">
                <LightMode fontSize="small" sx={{ mr: 0.5 }} /> Light
              </ToggleButton>
              <ToggleButton value="dark">
                <DarkMode fontSize="small" sx={{ mr: 0.5 }} /> Dark
              </ToggleButton>
            </ToggleButtonGroup>
          </ListItemButton>
        </ListItem>

        <Divider />

        <ListSubheader>Contact Us</ListSubheader>

        <ListItem key='Leave Feedback'>
          <ListItemButton href="https://discord.gg/N4QavHBBAG" target="_blank">
            <ListItemIcon>
              <Feedback />
            </ListItemIcon>
            <ListItemText primary='Leave Feedback' />
          </ListItemButton>
        </ListItem>

        <ListItem key='New Game Request'
        >
          <ListItemButton href="https://discord.gg/jm3vgPc6dF" target="_blank">
            <ListItemIcon>
              <AddTask />
            </ListItemIcon>
            <ListItemText primary='Game Request' />
          </ListItemButton>
        </ListItem>

        <Divider />

        <ListItem key='Sign out'>
          <ListItemButton
            component="a"
            href="/auth/logout">
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary='Sign out' />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment key={anchor}>
        <IconButton>
          <AccountCircleOutlined onClick={toggleDrawer(anchor, true)}
            sx={{
              color: theme.palette.primary.dark,
            }}
          />
        </IconButton>
        <Drawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
        >
          {list(anchor)}
        </Drawer>
        <Dialog open={adultConfirmOpen} onClose={handleAdultCancel}>
          <DialogTitle>Age Verification</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This content is intended for mature audiences. By selecting Adult mode, you confirm that you are 18 years of age or older.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAdultCancel}>Cancel</Button>
            <Button onClick={handleAdultConfirm} variant="contained">I confirm I am 18+</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
}
