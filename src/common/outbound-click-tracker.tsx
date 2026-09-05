'use client';

import { analytics } from '@/analytics/track';
import * as React from 'react';

export function OutboundClickTracker({ url, label, itemId, children }: {
    url: string;
    label: string;
    itemId?: string;
    children: React.ReactElement;
}) {
    const onClick = () => analytics.outboundClick({ url, label, item_id: itemId });
    return <span onClick={onClick}>{children}</span>;
}
