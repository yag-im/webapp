import poweredByDosBoxLogo from '@/images/powered_by/dosbox-logo.svg';
import poweredByDosBoxXLogo from '@/images/powered_by/dosbox-x-logo.svg';
import poweredByIgdbLogo from '@/images/powered_by/IGDB_logo.svg';
import poweredByScummVmLogo from '@/images/powered_by/ScummVM-logo.svg';
import poweredByWineLogo from '@/images/powered_by/WINE-logo.svg';
import poweredByRetroArchLogo from '@/images/powered_by/RetroArch-logo.svg';
import { NextLink } from '@/routing/next-link';
import { Divider, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';

interface PoweredByImageProps {
  src: string;
  alt: string;
}

const PoweredByImage = ({ src, alt, ...rest }: PoweredByImageProps) => {
  return (
    <div className="hover-image">
      <Image
        src={src}
        alt={alt}
        height={48}
        {...rest}
      />
    </div>
  );
};

export function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid #f5f5f5',
        margin: '48px 0'
      }}
    // className="bottom-0 bg-white p-4 sticky"
    >
      <Grid
        container xs={12}
        direction='row'
        rowGap={4}
        padding={2}
      >
        <Grid item xs={12}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            divider={<Divider orientation="vertical" flexItem />}
            justifyContent="center"
          >
            <NextLink href="/legal/about-us">
              About Us
            </NextLink>
            <NextLink href='/legal/privacy-policy'>
              Privacy Policy
            </NextLink>
            <NextLink href="/legal/dmca">
              DMCA Policy
            </NextLink>
            <NextLink href="/legal/cookies">
              Cookies
            </NextLink>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 4, sm: 2, md: 4 }}
            // divider={<Divider orientation="vertical" flexItem />}
            justifyContent="center" // Aligns children to the right
          >
            <Typography
              variant="overline"
              sx={{
                alignContent: 'center'
              }}
            >Powered by:</Typography>
            <a href="https://www.igdb.com/">
              <PoweredByImage src={poweredByIgdbLogo} alt="IGDB" />
            </a>
            <a href="https://dosbox-x.com/" className="mx-4">
              <PoweredByImage src={poweredByDosBoxXLogo} alt="DOSBox-X" />
            </a>
            <a href="https://www.scummvm.org/" className="mx-4">
              <PoweredByImage src={poweredByScummVmLogo} alt="ScummVM" />
            </a>
            <a href="https://www.dosbox.com/" className="mx-4">
              <PoweredByImage src={poweredByDosBoxLogo} alt="DOSBox" />
            </a>
            <a href="https://www.winehq.org/" className="mx-4">
              <PoweredByImage src={poweredByWineLogo} alt="WineHQ" />
            </a>
            <a href="https://www.retroarch.com/" className="mx-4">
              <PoweredByImage src={poweredByRetroArchLogo} alt="RetroArch" />
            </a>
          </Stack>
        </Grid>
      </Grid>


    </footer>
  );
}

export default Footer;
