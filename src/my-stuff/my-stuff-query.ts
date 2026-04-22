import type { GameReleaseCardProps } from '@/games/game-card';

export type MyStuffKind = 'FAVORITES' | 'RECENTLY_PLAYED';

export async function fetchMyStuff(kind: MyStuffKind): Promise<GameReleaseCardProps[]> {
    const response = await fetch('/api/apps/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ my_stuff: kind }),
    });
    if (!response.ok) {
        return [];
    }
    const json = await response.json();
    return json.apps ?? [];
}
