"use client";

import { Box } from '@mui/material';
import { useEffect, useRef } from 'react';

type AdsenseBannerProps = {
    /** publisher id, e.g. ca-pub-XXXXXXXXXXXXXXXX */
    client?: string;
    /** ad unit slot id (digits only) */
    slot?: string;
    /** show a bordered placeholder instead of a real ad (dev/localhost) */
    mock?: boolean;
    /** optional wrapper styles (e.g. maxWidth on desktop) */
    style?: React.CSSProperties;
};

const isValidClient = (v?: string) => !!v && /^ca-pub-\d+$/i.test(v);
const isValidSlot = (v?: string) => !!v && /^\d+$/.test(v);

export function AdsenseBanner({ client, slot, mock, style }: AdsenseBannerProps) {
    const pushed = useRef(false);

    useEffect(() => {
        if (mock || pushed.current || !isValidClient(client) || !isValidSlot(slot)) return;
        try {
            const w = window as unknown as { adsbygoogle?: unknown[] };
            (w.adsbygoogle = w.adsbygoogle || []).push({});
            pushed.current = true;
        } catch {
            // adsbygoogle loader not ready yet; nothing to do
        }
    }, [client, slot, mock]);

    if (mock) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    minHeight: 90,
                    border: '2px dashed',
                    borderColor: 'divider',
                    borderRadius: 1,
                    color: 'text.secondary',
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                    backgroundColor: 'action.hover',
                }}
            >
                Ad banner (dev mock) · 728×90
            </Box>
        );
    }

    if (!isValidClient(client) || !isValidSlot(slot)) return null;

    return (
        <ins
            className="adsbygoogle"
            style={{ display: 'block', width: '100%', ...style }}
            data-ad-client={client}
            data-ad-slot={slot}
            data-ad-format="horizontal"
            data-full-width-responsive="true"
        />
    );
}
