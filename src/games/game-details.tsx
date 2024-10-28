'use client';

import { Grid, Typography } from "@mui/material";
import Image from 'next/image';

type MediaAssets = {
  cover: { image_id: string };
  screenshots: { height: number; image_id: string; width: number }[];
};

export type GameReleaseDetailsProps = {
  alternative_names: string[];
  app_reqs: {
    screen_height: number;
    screen_width: number;
    midi: boolean;
    color_bits: number;
    ua: {
      lock_pointer: boolean;
    };
  };
  companies: {
    id: number;
    name: string;
    developer: boolean;
    porting: boolean;
    publisher: boolean;
    supporting: boolean;
  }[];
  esrb_rating?: number;
  igdb: {
    id: number;
    slug: string;
    similar_ids: number[];
  };
  is_visible: boolean;
  lang: string;
  long_descr: string;
  media_assets: MediaAssets;
  media_assets_localized?: MediaAssets;
  name: string;
  platform: {
    id: number;
    name: string;
    abbreviation: string;
    alternative_name: string;
    slug: string;
  };
  refs: {
    ag_id?: string;
    lutris_id?: string;
    mg_id?: string;
    pcgw_id?: string;
    qz_id?: string;
  }
  runner: { name: string };
  short_descr: string;
  ts_added: string;
  uuid: string;
  year_released: number;
};

const esrbRatingImages: { [key: string]: string } = {
  '6': '/images/esrb/rp.svg',
  '7': '/images/esrb/ec.svg',
  '8': '/images/esrb/e.svg',
  '9': '/images/esrb/e10.svg',
  '10': '/images/esrb/t.svg',
  '11': '/images/esrb/m.svg',
  '12': '/images/esrb/ao.svg',
};

export function GameDetails(gameDetails: GameReleaseDetailsProps) {

  const getEsrbDisplay = (rating?: number) => {
    if (!rating) {
      return null;
    }
    const imageSrc = esrbRatingImages[rating.toString()];
    return imageSrc ? (
      <Image
        src={imageSrc}
        alt={"ESRB Rating"}
        width={32}
        height={45}
      />
    ) : null;
  };

  const detailsValueFallbackText = 'N/A';

  const gameDetailsList = [
    { key: "Publisher", value: gameDetails.companies.find(company => company.publisher)?.name || <Typography>{detailsValueFallbackText}</Typography> },
    { key: "Year released", value: gameDetails.year_released },
    { key: "Platform", value: gameDetails.platform.name },
    { key: "Language", value: gameDetails.lang },
    { key: "ESRB rating", value: getEsrbDisplay(gameDetails.esrb_rating) || <Typography>{detailsValueFallbackText}</Typography> }
  ];

  return (
    <Grid container spacing={2}>
      {gameDetailsList.map(item => (
        <Grid container item key={item.key} spacing={1}>
          <Grid item xs={4}>
            <Typography variant='body1' component="div">
              {item.key}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" component="div">
              {item.value}
            </Typography>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}
