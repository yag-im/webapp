'use client';

import { collectGpuInfo } from '@/analytics/device-info';
import { analytics, gaReady } from '@/analytics/track';
import { useEffect } from 'react';

export const DEVICE_INFO_SESSION_KEY = 'yag_device_info_sent';
const GA_WAIT_INTERVAL_MS = 500;
const GA_WAIT_ATTEMPTS = 20;

// Reports GPU details once per browser session. The GA init script loads afterInteractive,
// so wait briefly for its dataLayer instead of dropping the event.
export function DeviceInfoTracker() {
    useEffect(() => {
        let cancelled = false;
        let timer: ReturnType<typeof setTimeout> | undefined;

        try {
            if (sessionStorage.getItem(DEVICE_INFO_SESSION_KEY)) return;
        } catch {
            // sessionStorage may be unavailable (privacy mode); fall through and report anyway
        }

        const send = async () => {
            const info = await collectGpuInfo();
            if (cancelled || !info) return;
            analytics.deviceInfo(info);
            try {
                sessionStorage.setItem(DEVICE_INFO_SESSION_KEY, '1');
            } catch {
                // ignore
            }
        };

        let attempts = 0;
        const waitForGa = () => {
            if (cancelled) return;
            if (gaReady()) {
                if ('requestIdleCallback' in window) window.requestIdleCallback(() => void send());
                else void send();
                return;
            }
            if (++attempts < GA_WAIT_ATTEMPTS) timer = setTimeout(waitForGa, GA_WAIT_INTERVAL_MS);
        };
        waitForGa();

        return () => {
            cancelled = true;
            if (timer) clearTimeout(timer);
        };
    }, []);

    return null;
}
