'use client';

import { GameReleaseCard, type GameReleaseCardProps } from '@/games/game-card';
import { GameList } from '@/games/game-list';
import { Box, Typography } from '@mui/material';
import { useQueries } from '@tanstack/react-query';
import { fetchMyStuff } from './my-stuff-query';

function Section({ title, games }: { title: string; games: GameReleaseCardProps[] }) {
    return (
        <Box mb={4}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                {title}
            </Typography>
            {games.length === 0 ? (
                <Typography variant="body1" color="text.secondary">
                    Nothing here yet.
                </Typography>
            ) : (
                <GameList>
                    {games.map((game) => (
                        <li key={game.id}>
                            <GameReleaseCard {...game} />
                        </li>
                    ))}
                </GameList>
            )}
        </Box>
    );
}

export function MyStuff() {
    const [favoritesQuery, recentlyPlayedQuery] = useQueries({
        queries: [
            {
                queryKey: ['my-stuff', 'FAVORITES'],
                queryFn: () => fetchMyStuff('FAVORITES'),
            },
            {
                queryKey: ['my-stuff', 'RECENTLY_PLAYED'],
                queryFn: () => fetchMyStuff('RECENTLY_PLAYED'),
            },
        ],
    });

    if (favoritesQuery.isLoading || recentlyPlayedQuery.isLoading) {
        return <Typography>Loading...</Typography>;
    }
    if (favoritesQuery.isError || recentlyPlayedQuery.isError) {
        return <Typography>Unable to load My Stuff. Please sign in and try again.</Typography>;
    }

    return (
        <>
            <Section title="Favorites" games={favoritesQuery.data ?? []} />
            <Section title="Recently played" games={recentlyPlayedQuery.data ?? []} />
        </>
    );
}
