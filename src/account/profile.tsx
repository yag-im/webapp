'use client'

import { AccountCircleOutlined, AddTask, ChildFriendly, Feedback, Logout, Mail } from '@mui/icons-material';
import { Checkbox, IconButton, ListSubheader, Typography } from '@mui/material';
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
import type { UserProfileProps } from './switch';

function isKid(dob: number) {
  const kidsAge = 10 * 365 * 24 * 3600; // 5 years old
  const now = Date.now();
  const diff = now - dob;
  return diff < kidsAge;
}

const TruncatedListItemText = styled(ListItemText)(({}) => ({
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
  const [isKidsModeChecked, setIsKidsModeChecked] = React.useState(isKid(Date.parse(userProfile.dob)));
  const updUserProfile = React.useRef<UserProfileProps | null>(null);
  const theme = useTheme();

  React.useEffect(() => {
    updUserProfile.current = structuredClone(userProfile);
  }, []);

  function handleKidsModeChange(isChecked: boolean) {
    setIsKidsModeChecked(isChecked);
    if (updUserProfile.current) { updUserProfile.current.dob = isChecked ? moment(new Date()).format('YYYY-MM-DD') : "1970-01-01"; }
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
          if (isKid(Date.parse(updUserProfile.current.dob)) !== isKid(Date.parse(userProfile.dob))) { window.location.reload(); }
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

        <ListItem
          key='KidsMode'
          secondaryAction={
            <Checkbox
              checked={isKidsModeChecked}
              onChange={(event) => { handleKidsModeChange(event.target.checked); }}
              sx={{
                color: theme.palette.primary.main
              }}
            />
          }
        >
          <ListItemButton
            disableRipple
            sx={{
              cursor: 'default',
              '&:hover': { backgroundColor: 'transparent' },
              '&:focus': { outline: 'none' }
            }}
          >
            <ListItemIcon>
              <ChildFriendly />
            </ListItemIcon>
            <ListItemText primary='Kids Mode' />
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
            href="/api/auth/logout">
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
      </React.Fragment>
    </div>
  );
}
