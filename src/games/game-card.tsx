// Games Catalog page -> Game Card

'use client';

import React from 'react';
import { CDN_URL } from '@/common/common-utils';
import { NextLink } from '@/routing/next-link';
import { Box, CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';


export type GameReleaseCardProps = {
  cover_image_id: string;
  esrb_rating: number;
  id: number;
  lang: string;
  name: string;
  slug: string;
  year_released: number;
  platform: string;
  distro_format: string;
};

const LimitedCardTitle = styled(Typography)`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export function GameReleaseCard(game: GameReleaseCardProps) {
  const [imgLoaded, setImgLoaded] = React.useState(false);

  React.useEffect(() => {
    const src = `${CDN_URL}/covers/${game.cover_image_id}.jpg`;

    // Start a preload link to encourage the browser to fetch visible images eagerly.
    // We add it only if it doesn't already exist to avoid duplicates.
    let linkEl: HTMLLinkElement | null = null;
    const selector = `link[rel="preload"][href="${src}"]`;
    if (!document.querySelector(selector)) {
      linkEl = document.createElement('link');
      linkEl.rel = 'preload';
      linkEl.as = 'image';
      linkEl.href = src;
      // optionally set crossorigin if CDN requires it
      // linkEl.crossOrigin = 'anonymous';
      document.head.appendChild(linkEl);
    }

    // Also use an Image() as a fallback preloader to trigger onload quickly.
    const pre = new Image();
    pre.src = src;
    pre.onload = () => setImgLoaded(true);
    pre.onerror = () => setImgLoaded(true);

    return () => {
      pre.onload = null;
      pre.onerror = null;
      if (linkEl && linkEl.parentNode) {
        linkEl.parentNode.removeChild(linkEl);
      }
    };
  }, [imgLoaded, game.cover_image_id]);

  return (
    <NextLink href={`/games/${game.id}/${game.slug}`}>
      <Card
        sx={{
          // maxWidth: 345, - messes up the card width at xs size
          display: 'flex',
          flexDirection: 'column-reverse',
          height: '100%',
          overflow: 'hidden', // Hide any overflow content
        }}
      >
        <CardActionArea
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {}
          <Box sx={{ flex: '1', position: 'relative' }}>
            <CardMedia
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
              component="img"
              image={`${CDN_URL}/covers/${game.cover_image_id}.jpg`}
              alt={game.name}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgLoaded(true)}
            />

            <div
              className="skeleton-wave"
              style={{
                position: 'absolute',
                inset: 0,
                opacity: imgLoaded ? 0 : 1,
                transition: 'opacity 350ms ease',
                pointerEvents: 'none',
              }}
              aria-hidden
            />
          </Box>
          <CardContent
            sx={{
              // height: '50%',
              textAlign: 'start',
              width: '100%'
            }}
          >
            <Box><LimitedCardTitle
              sx={{ textAlign: 'left' }}
              gutterBottom variant="h5"
            >
              {game.name}
            </LimitedCardTitle>
              <Typography variant="body2" color="text.secondary">
                {game.year_released} • {game.lang} • {game.platform}
                {game.distro_format !== "changeme" && ` • ${game.distro_format}`}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </NextLink >
  );
}
