// Games Catalog page -> Game Card

'use client';

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
          <CardMedia
            sx={{
              flex: '1',
              // height: '150px',
              // width: '150px'
            }}
            component="img"
            // height="auto"
            image={`${CDN_URL}/covers/${game.cover_image_id}.jpg`}
            alt={game.name}
          />
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
