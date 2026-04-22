'use client';

import { parseAppsLib, useToggleFavorite, useUserProfile } from '@/account/user-profile-hooks';
import { Star, StarBorder } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { useMemo } from 'react';

export function FavoriteButton({ releaseId }: { releaseId: string }) {
    const { data: userProfile } = useUserProfile();
    const toggleFavorite = useToggleFavorite();

    const isFavorite = useMemo(() => {
        if (!userProfile) return false;
        const lib = parseAppsLib(userProfile.apps_lib);
        return Array.isArray(lib.favorite_games) && lib.favorite_games.includes(releaseId);
    }, [userProfile, releaseId]);

    if (!userProfile) {
        return null;
    }

    return (
        <Tooltip title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
            <span>
                <IconButton
                    onClick={() => toggleFavorite.mutate(releaseId)}
                    disabled={toggleFavorite.isPending}
                    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    sx={{ color: isFavorite ? 'warning.main' : 'text.secondary' }}
                >
                    {isFavorite ? <Star /> : <StarBorder />}
                </IconButton>
            </span>
        </Tooltip>
    );
}
