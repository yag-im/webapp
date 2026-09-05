'use client';

import { sendGAEvent } from '@next/third-parties/google';

// Analytics wrapper around the @next/third-parties GoogleAnalytics dataLayer.
// GA_ID is provided at runtime (dev: .devcontainer/.env, prod: k8s ConfigMap) and is
// not inlined into the client bundle, so we gate on the runtime signal that the
// server-rendered <GoogleAnalytics> has initialized gtag's dataLayer on the client.
function gaReady(): boolean {
    return typeof window !== 'undefined'
        && Array.isArray((window as unknown as { dataLayer?: unknown[] }).dataLayer);
}

export type EventParams = Record<string, string | number | boolean | undefined | null>;

function clean(params?: EventParams): Record<string, string | number | boolean> {
    if (!params) return {};
    const out: Record<string, string | number | boolean> = {};
    for (const [k, v] of Object.entries(params)) {
        if (v === undefined || v === null || v === '') continue;
        out[k] = v;
    }
    return out;
}

export function trackEvent(name: string, params?: EventParams): void {
    if (!gaReady()) return;
    try {
        // sendGAEvent(...args) => dataLayer.push(arguments)
        sendGAEvent('event', name, clean(params));
    } catch {
        // analytics must never break UX
    }
}

export const analytics = {
    search(searchTerm: string) {
        trackEvent('search', { search_term: searchTerm });
    },

    selectItem(p: {
        item_id: string;
        item_name: string;
        item_list_name?: string;
        index?: number;
        platform?: string;
    }) {
        trackEvent('select_item', p);
    },

    viewItem(p: {
        item_id: string;
        item_name: string;
        platform?: string;
        year?: number;
    }) {
        trackEvent('view_item', p);
    },

    login(method: string) {
        trackEvent('login', { method });
    },

    gameLaunchStart(p: {
        item_id: string;
        item_name: string;
        platform?: string;
        is_resume?: boolean;
    }) {
        trackEvent('game_launch_start', p);
    },

    gameLaunchSuccess(p: {
        item_id: string;
        item_name: string;
        platform?: string;
        time_to_first_frame_ms: number;
    }) {
        trackEvent('game_launch_success', p);
    },

    gameLaunchFailed(p: {
        item_id: string;
        item_name: string;
        platform?: string;
        error_code?: number;
        error_stage?: string;
        description?: string;
    }) {
        trackEvent('game_launch_failed', p);
    },

    gameSessionEnd(p: {
        item_id: string;
        item_name: string;
        platform?: string;
        duration_sec: number;
        exit_reason?: 'user' | 'error' | 'idle' | 'network' | 'unknown';
    }) {
        trackEvent('game_session_end', p);
    },

    exception(p: { description: string; fatal?: boolean }) {
        trackEvent('exception', p);
    },

    // ---- should-have ----

    favoriteAdd(p: { item_id: string }) {
        trackEvent('favorite_add', p);
    },

    favoriteRemove(p: { item_id: string }) {
        trackEvent('favorite_remove', p);
    },

    myStuffView(p: { favorites_count: number; recently_played_count: number }) {
        trackEvent('my_stuff_view', p);
    },

    gameResumeShown(p: { item_id: string; item_name?: string; status?: string }) {
        trackEvent('game_resume_shown', p);
    },

    gameResumeAction(p: {
        item_id: string;
        item_name?: string;
        action: 'resume' | 'close_and_start_new';
    }) {
        trackEvent('game_resume_action', p);
    },

    gameListScroll(p: { list_name: string; page: number }) {
        trackEvent('game_list_scroll', p);
    },

    screenshotView(p: { item_id?: string; index: number; count: number; action: 'open' | 'next' | 'prev' }) {
        trackEvent('screenshot_view', p);
    },

    safariWarningShown(p: { item_id: string; ua?: string }) {
        trackEvent('safari_warning_shown', p);
    },

    safariWarningDismissed(p: { item_id: string }) {
        trackEvent('safari_warning_dismissed', p);
    },

    outboundClick(p: { url: string; label: string; item_id?: string }) {
        trackEvent('outbound_click', p);
    },

    signOut() {
        trackEvent('sign_out');
    },

    inputFirstInteraction(p: { item_id: string; input_type: 'mouse' | 'keyboard' | 'gamepad'; latency_ms: number }) {
        trackEvent('input_first_interaction', p);
    },

    gamepadConnected(p: { id: string; mapping: string }) {
        trackEvent('gamepad_connected', p);
    },
};
