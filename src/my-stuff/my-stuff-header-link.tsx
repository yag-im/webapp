'use client';

import { useUserProfile } from '@/account/user-profile-hooks';
import { NextLink } from '@/routing/next-link';
import { Star } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

export function MyStuffHeaderLink() {
    const { data: userProfile } = useUserProfile();

    if (!userProfile) {
        return null;
    }

    return (
        <NextLink href="/my-stuff">
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    mr: 2,
                    color: 'text.primary',
                    cursor: 'pointer',
                    '&:hover': { color: 'primary.main' },
                }}
            >
                <Star fontSize="small" />
                <Typography variant="body1" sx={{ color: 'inherit' }}>
                    My Stuff
                </Typography>
            </Box>
        </NextLink>
    );
}
