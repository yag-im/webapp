"use client";

import { analytics } from '@/analytics/track';
import { CDN_URL } from '@/common/common-utils';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog, IconButton, ImageList, ImageListItem, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';

type Screenshot = {
    image_id: string;
};

type Props = {
    screenshots?: Screenshot[] | null;
    columns?: number;
    itemId?: string;
};

export default function ScreenshotGallery({ screenshots = [], columns = 5, itemId }: Props) {
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    const count = screenshots?.length ?? 0;
    const screenshotsArr = screenshots ?? [];

    const openAt = useCallback((i: number) => {
        analytics.screenshotView({ item_id: itemId, index: i, count, action: 'open' });
        setIndex(i);
        setOpen(true);
    }, [count, itemId]);

    const close = useCallback(() => setOpen(false), []);

    const prev = useCallback((e?: React.SyntheticEvent) => {
        e?.stopPropagation();
        setIndex((i) => {
            const next = count ? (i - 1 + count) % count : 0;
            analytics.screenshotView({ item_id: itemId, index: next, count, action: 'prev' });
            return next;
        });
    }, [count, itemId]);

    const next = useCallback((e?: React.SyntheticEvent) => {
        e?.stopPropagation();
        setIndex((i) => {
            const nextIndex = count ? (i + 1) % count : 0;
            analytics.screenshotView({ item_id: itemId, index: nextIndex, count, action: 'next' });
            return nextIndex;
        });
    }, [count, itemId]);

    if (count === 0) return null;

    // Keyboard handlers: Esc to close, ArrowLeft/ArrowRight to navigate
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                close();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prev();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                next();
            }
        };

        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, prev, next, close]);

    return (
        <>
            <Typography variant="h7" paragraph>
                Game Screens
            </Typography>

            <ImageList cols={columns} rowHeight={'auto'}>
                {screenshotsArr.map((item, i) => (
                    <ImageListItem key={item.image_id}>
                        <Box
                            onClick={() => openAt(i)}
                            sx={{
                                cursor: 'pointer',
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                                overflow: 'hidden',
                                border: '3px solid transparent',
                                transition: 'border-color 0.3s ease-out',
                                '&:hover': {
                                    borderColor: '#663399',
                                },
                            }}
                        >
                            <Box
                                component="img"
                                src={`${CDN_URL}/screenshots/${item.image_id}.jpg`}
                                srcSet={`${CDN_URL}/screenshots/${item.image_id}.jpg`}
                                alt={item.image_id}
                                loading="lazy"
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </Box>
                    </ImageListItem>
                ))}
            </ImageList>

            <Dialog
                open={open}
                onClose={close}
                maxWidth={false}
                PaperProps={{ style: { background: 'transparent', boxShadow: 'none' } }}
            >
                {/* index/total visible in modal */}
                <Typography
                    sx={{
                        position: 'absolute',
                        top: 12,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        color: 'white',
                        zIndex: 1300,
                        backgroundColor: 'rgba(0,0,0,0.45)',
                        px: 1,
                        borderRadius: 1,
                    }}
                >
                    {`${index + 1} of ${count}`}
                </Typography>
                <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
                    <IconButton
                        onClick={prev}
                        sx={{ position: 'absolute', left: 8, color: 'white', zIndex: 1201 }}
                        aria-label="previous"
                    >
                        <ArrowBackIosIcon />
                    </IconButton>

                    <img
                        src={`${CDN_URL}/screenshots/${screenshotsArr[index]?.image_id}.jpg`}
                        alt={screenshotsArr[index]?.image_id}
                        style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain' }}
                    />

                    <IconButton
                        onClick={next}
                        sx={{ position: 'absolute', right: 8, color: 'white', zIndex: 1201 }}
                        aria-label="next"
                    >
                        <ArrowForwardIosIcon />
                    </IconButton>

                    <IconButton onClick={close} sx={{ position: 'absolute', top: 8, right: 8, color: 'white', zIndex: 1201 }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </Dialog>
        </>
    );
}
