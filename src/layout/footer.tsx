import poweredByDosBoxLogo from '@/images/powered_by/dosbox-logo.svg';
import poweredByDosBoxXLogo from '@/images/powered_by/dosbox-x-logo.svg';
import poweredByIgdbLogo from '@/images/powered_by/IGDB-logo.svg';
import poweredByQuemuLogo from '@/images/powered_by/QEMU-logo.svg';
import poweredByRetroArchLogo from '@/images/powered_by/RetroArch-logo.svg';
import poweredByScummVmLogo from '@/images/powered_by/ScummVM-logo.svg';
import poweredByWineLogo from '@/images/powered_by/WINE-logo.svg';
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
        height={24}
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
        position: 'sticky',
        bottom: 0,
        backgroundColor: '#fff',
        zIndex: 10,
        padding: '4px 0',
      }}
    >
      <div className="mx-auto w-full max-w-screen-xl px-2 md:px-4">
        <Grid
          container
          direction='row'
          padding={0.5}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* --- Legal Links --- */}
          <Grid item xs={12} md="auto">
            <Stack
              direction="row"
              spacing={{ xs: 1, sm: 1.5, md: 2 }}
              flexWrap="wrap"
              divider={<Divider orientation="vertical" flexItem />}
              justifyContent={{ xs: 'center', md: 'flex-start' }}
              alignItems="center"
            >
              <NextLink href="/legal/about-us" className="text-black">
                About Us
              </NextLink>
              <NextLink href='/legal/privacy-policy' className="text-black">
                Privacy Policy
              </NextLink>
              <NextLink href="/legal/dmca" className="text-black">
                DMCA Policy
              </NextLink>
              <NextLink href="/legal/cookies" className="text-black">
                Cookies
              </NextLink>
              <a href="https://github.com/yag-im" target="_blank" rel="noopener noreferrer" className="text-black">
                GitHub
              </a>
              <a href="https://www.buymeacoffee.com/yagim" target="_blank" rel="noopener noreferrer" className="text-black">
                Support Us
              </a>
            </Stack>
          </Grid>

          {/* --- Powered By Logos --- */}
          <Grid item xs={12} md="auto">
            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              justifyContent={{ xs: 'center', md: 'flex-end' }}
              alignItems="center"
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
              <a href="https://www.qemu.org/" className="mx-4">
                <PoweredByImage src={poweredByQuemuLogo} alt="QEMU" />
              </a>
            </Stack>
          </Grid>
        </Grid>
      </div>


    </footer>
  );
}

export default Footer;
