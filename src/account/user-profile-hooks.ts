'use client';

import type { UserProfileProps } from '@/games/game-player-helpers';
import { useMutation, useQuery, useQueryClient, type QueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export const USER_QUERY_KEY = ['user'] as const;

const USER_PROFILE_CHANNEL = 'user-profile-sync';

type UserProfileBroadcastMessage =
    | { type: 'updated'; profile: UserProfileProps };

function getBroadcastChannel(): BroadcastChannel | null {
    if (typeof window === 'undefined') return null;
    if (typeof BroadcastChannel === 'undefined') return null;
    return new BroadcastChannel(USER_PROFILE_CHANNEL);
}

function broadcastProfileUpdate(message: UserProfileBroadcastMessage) {
    const channel = getBroadcastChannel();
    if (!channel) return;
    try {
        channel.postMessage(message);
    } finally {
        channel.close();
    }
}

export type AppsLib = {
    favorite_games?: string[];
    recently_played_games?: string[];
    [key: string]: unknown;
};

export function parseAppsLib(raw: unknown): AppsLib {
    if (!raw) return {};
    if (typeof raw === 'object') return raw as AppsLib;
    if (typeof raw === 'string') {
        try {
            return JSON.parse(raw) as AppsLib;
        } catch {
            return {};
        }
    }
    return {};
}

function serializeAppsLib(lib: AppsLib, original: unknown): unknown {
    // Preserve the same shape (string vs object) the server originally returned.
    return typeof original === 'string' ? JSON.stringify(lib) : lib;
}

async function fetchUserProfile(): Promise<UserProfileProps | null> {
    const response = await fetch('/api/accounts/user');
    if (!response.ok) {
        return null;
    }
    return (await response.json()) as UserProfileProps;
}

/**
 * Single source of truth for the signed-in user profile.
 * Returns null when the user is not authenticated.
 */
export function useUserProfile() {
    return useQuery<UserProfileProps | null>({
        queryKey: USER_QUERY_KEY,
        queryFn: fetchUserProfile,
    });
}

/**
 * Partial update of the user profile. The backend is expected to merge the
 * provided fields onto the stored record (PATCH semantics) so that concurrent
 * updates to different fields (e.g. favorites vs. age mode) don't clobber
 * each other.
 */
export function useUpdateUserProfile() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (patch: Partial<UserProfileProps>) => {
            const response = await fetch('/api/accounts/user', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(patch),
            });
            if (!response.ok) {
                throw new Error('Failed to update user profile');
            }
            // Backend may return the merged profile; fall back to local merge.
            try {
                return (await response.json()) as UserProfileProps;
            } catch {
                return null;
            }
        },
        onSuccess: (serverProfile, patch) => {
            const next = queryClient.setQueryData<UserProfileProps | null>(USER_QUERY_KEY, (prev) => {
                if (serverProfile) return serverProfile;
                if (!prev) return prev;
                return { ...prev, ...patch } as UserProfileProps;
            });
            if (next) {
                broadcastProfileUpdate({ type: 'updated', profile: next });
            }
        },
    });
}

/**
 * Toggle a release id in the user's `apps_lib.favorite_games`.
 * Reads the freshest profile from the query cache so that concurrent edits
 * (from other components / tabs) are not overwritten.
 */
export function useToggleFavorite() {
    const queryClient = useQueryClient();
    const updateProfile = useUpdateUserProfile();

    return useMutation({
        mutationFn: async (releaseId: string) => {
            const current = queryClient.getQueryData<UserProfileProps | null>(USER_QUERY_KEY);
            if (!current) {
                throw new Error('Not authenticated');
            }
            const lib = parseAppsLib(current.apps_lib);
            const favorites: string[] = Array.isArray(lib.favorite_games) ? [...lib.favorite_games] : [];
            const idx = favorites.indexOf(releaseId);
            if (idx >= 0) {
                favorites.splice(idx, 1);
            } else {
                favorites.push(releaseId);
            }
            const newLib: AppsLib = { ...lib, favorite_games: favorites };
            const apps_lib = serializeAppsLib(newLib, current.apps_lib) as string;
            await updateProfile.mutateAsync({ apps_lib });
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ['my-stuff'] });
        },
    });
}

/**
 * Subscribe the current tab's react-query cache to profile updates
 * broadcast by other tabs via BroadcastChannel. Mount once near the
 * root of the client tree.
 */
export function useUserProfileTabSync() {
    const queryClient = useQueryClient();
    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (typeof BroadcastChannel === 'undefined') return;

        const channel = new BroadcastChannel(USER_PROFILE_CHANNEL);
        const onMessage = (event: MessageEvent<UserProfileBroadcastMessage>) => {
            applyProfileBroadcast(queryClient, event.data);
        };
        channel.addEventListener('message', onMessage);
        return () => {
            channel.removeEventListener('message', onMessage);
            channel.close();
        };
    }, [queryClient]);
}

function applyProfileBroadcast(
    queryClient: QueryClient,
    message: UserProfileBroadcastMessage | undefined,
) {
    if (!message) return;
    queryClient.setQueryData<UserProfileProps | null>(USER_QUERY_KEY, message.profile);
    void queryClient.invalidateQueries({ queryKey: ['my-stuff'] });
}
