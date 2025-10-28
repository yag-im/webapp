import { CDN_URL } from '@/common/common-utils';
import { GameDetails } from '@/games/game-details';
import { getGameDetails } from '@/games/game-details-query';
import { GamePlayer } from '@/games/game-player';
import ScreenshotGallery from '@/games/screenshot-gallery';
import { NextLink } from '@/routing/next-link';
import { getMetadata } from '@/seo/seo-utils';
import { ArrowBack } from '@mui/icons-material';
import { Box, Button, Card, CardContent, Grid, Paper, Stack, Typography } from '@mui/material';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const feedbackCardContents = [
  {
    title: 'Share feedback',
    description: 'We would love to know more <br /> about your gaming experience <br /> with us.',
    button: {
      text: 'Open Discord Channel',
      href: 'https://discord.gg/N4QavHBBAG',
    },
  },
  {
    title: 'Request a new game',
    description: 'Desperately searching for your <br /> favorite childhood game? <br /> Let us know and we’ll add it!',
    button: {
      text: 'Open Discord Channel',
      href: 'https://discord.gg/N4QavHBBAG',
    },
  },
  {
    title: 'Report an issue',
    description: 'Found an issue with a game? <br /> Let us know — we’ll get it fixed!',
    button: {
      text: 'Open Discord Channel',
      href: 'https://discord.gg/N4QavHBBAG',
    },
  },
];

function getRandomFeedbackCardContent() {
  const idx = Math.floor(Math.random() * feedbackCardContents.length);
  return feedbackCardContents[idx];
}

type GamePageProps = {
  params: {
    gameId: string[]; // [games.releases.id, games.games.name]
  };
};

export async function generateMetadata({
  params: { gameId },
}: GamePageProps): Promise<Metadata> {
  // TODO: getGameDetails is called twice: once on game page once here
  const { gameDetails } = await getGameDetails(gameId[0]);
  if (gameDetails == null) {
    notFound();
  }
  const cover_image_id = gameDetails.media_assets_localized?.cover.image_id ?? gameDetails.media_assets.cover.image_id;

  return getMetadata({
    title: gameDetails.name,
    description: `Play "${gameDetails.name}" online in your browser with no installation needed.`,
    pathname: `/games/${gameId[0]}/${gameId[1]}`,
    images:
      gameDetails.name && cover_image_id
        ? [
          {
            url: `${CDN_URL}/covers/${cover_image_id}.jpg`,
            alt: gameDetails.name,
          },
        ]
        : [],
  });
}

interface RefLinkProps {
  url: string;
  alt: string;
  src: string;
  ref_id?: string;
}

const RefLink = ({ url, alt, src, ref_id }: RefLinkProps) => {
  return ref_id ? (
    <Box>
      <a href={`${url}${ref_id}`} target="_blank">
        <Image alt={alt} src={src} width={24} height={24} />
      </a>
    </Box>
  ) : null;
};

export default async function GamePage({
  params: { gameId },
}: GamePageProps) {
  const feedbackCardContent = getRandomFeedbackCardContent();
  // TODO: getGameDetails is called twice: once at generateMetadata() and once here
  const { gameDetails } = await getGameDetails(gameId[0]);
  if (gameDetails == null) {
    notFound();
  }
  const screenshots = gameDetails.media_assets_localized?.screenshots.length ? gameDetails.media_assets_localized.screenshots : gameDetails.media_assets.screenshots;
  const cover_image_id = gameDetails.media_assets_localized?.cover.image_id ?? gameDetails.media_assets.cover.image_id;

  return (
    <Grid container xs={12} spacing={3}>

      <Grid item xs={12}>
        <NextLink href="/">
          <Box
            sx={{
              display: { md: 'none', xs: 'block' }
            }}
          >
            <Button startIcon={<ArrowBack />}>Back To Catalog</Button>
          </Box>
        </NextLink>
      </Grid>
      <Grid item xs={12}>
        <Typography noWrap={true} variant='h4'>{gameDetails.name}</Typography>
        {/* Game title - 1 line max, then ellipsis */}
      </Grid>

      <Grid item xs={12} sm={12} md={6}>
        <Paper
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '320px', // This could later change based on real game screen dimensions
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
            backgroundImage: `url(${CDN_URL}/covers/${cover_image_id}.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Grey gradient overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(8, 8, 8, 0.5))',
              zIndex: 1,
            }}
          />
          {/* Content */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <section>
              <GamePlayer {...gameDetails} />
            </section>
          </div>

        </Paper>
      </Grid>
      <Grid item xs={12} sm={10} md={5} >
        <Typography variant='h7' paragraph>Details</Typography>
        <GameDetails {...gameDetails} />
      </Grid>
      <Grid item xs={12} sm={2} md={1}>
        <Typography variant='h7' paragraph>Links</Typography>
        <Stack
          spacing={2}
          direction={{ xs: 'row', sm: 'column' }} // Change direction based on screen size
        >
          <RefLink
            url="https://adventuregamers.com/games/view/"
            alt="AdventureGamers"
            src="/images/outbound-logos/adventure_gamers.png"
            ref_id={gameDetails.refs.ag_id}
          />
          <RefLink
            url="https://lutris.net/games/"
            alt="Lutris"
            src="/images/outbound-logos/lutris.png"
            ref_id={gameDetails.refs.lutris_id}
          />
          <RefLink
            url="https://www.igdb.com/games/"
            alt="IGDB"
            src="/images/outbound-logos/igdb.png"
            ref_id={gameDetails.igdb.slug}
          />
          <RefLink
            url="https://www.mobygames.com/game/"
            alt="MobyGames"
            src="/images/outbound-logos/moby_games.png"
            ref_id={gameDetails.refs.mg_id}
          />
          <RefLink
            url="https://www.pcgamingwiki.com/wiki/"
            alt="PCGamingWiki"
            src="/images/outbound-logos/pc_gaming_wiki.png"
            ref_id={gameDetails.refs.pcgw_id}
          />
          <RefLink
            url="https://questzone.ru/enzi/game/"
            alt="QuestZone"
            src="/images/outbound-logos/questzone_ru.png"
            ref_id={gameDetails.refs.qz_id}
          />
          {gameDetails.distro.url === 'exoscummvm' && (
            <Box>
              <a href="https://www.retro-exo.com/scummvm.html" target="_blank">
                <Image alt="eXoScummVM" src="/images/outbound-logos/exodos.ico" width={24} height={24} />
              </a>
            </Box>
          )}
        </Stack>
      </Grid>
      <Grid item xs={12} sm={12} md={9}>
        <Typography variant="h7" paragraph>Description</Typography>
        <Typography variant="body1" paragraph>{gameDetails.short_descr}</Typography>
        {screenshots && screenshots.length > 0 && <ScreenshotGallery screenshots={screenshots} />}
      </Grid>
      <Grid item xs={9} sm={6} md={3}>
        <Card sx={{
          // maxWidth: 240,
          // padding: '8px',
          borderRadius: '16px',
          backgroundColor: 'rgba(103, 80, 164, 0.07)',
        }}>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography gutterBottom variant='h6'>{feedbackCardContent.title}</Typography>
            <Typography paragraph align='center' dangerouslySetInnerHTML={{ __html: feedbackCardContent.description }} />
            <Button
              href={feedbackCardContent.button.href}
              target='_blank'
              variant='outlined'
            >{feedbackCardContent.button.text}</Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
