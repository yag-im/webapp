'use client';

import { analytics } from '@/analytics/track';
import { Box } from '@mui/material';
import Image from 'next/image';

export interface RefLinkProps {
    url: string;
    alt: string;
    src: string;
    ref_id?: string;
    itemId?: string;
}

export function RefLink({ url, alt, src, ref_id, itemId }: RefLinkProps) {
    if (!ref_id) return null;
    const href = `${url}${ref_id}`;
    return (
        <Box>
            <a
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => analytics.outboundClick({ url: href, label: alt, item_id: itemId })}
            >
                <Image alt={alt} src={src} width={24} height={24} />
            </a>
        </Box>
    );
}
