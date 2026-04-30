import poweredByDosBoxLogo from '@/images/powered_by/dosbox-logo.svg';
import poweredByDosBoxXLogo from '@/images/powered_by/dosbox-x-logo.svg';
import poweredByIgdbLogo from '@/images/powered_by/IGDB-logo.svg';
import poweredByQuemuLogo from '@/images/powered_by/QEMU-logo.svg';
import poweredByRetroArchLogo from '@/images/powered_by/RetroArch-logo.svg';
import poweredByScummVmLogo from '@/images/powered_by/ScummVM-logo.svg';
import poweredByWineLogo from '@/images/powered_by/WINE-logo.svg';
import { NextLink } from '@/routing/next-link';
import { Box, Divider, Stack, Typography } from '@mui/material';
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
    <Box
      component="footer"
      sx={{
        borderTop: '1px solid',
        borderColor: 'divider',
        position: 'sticky',
        bottom: 0,
        backgroundColor: 'background.paper',
        color: 'text.primary',
        zIndex: 10,
        padding: '8px 0',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', padding: '4px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* --- Legal Links (left-aligned) --- */}
        <Stack
          direction="row"
          spacing={{ xs: 0.5, sm: 1, md: 1.5 }}
          flexWrap="wrap"
          divider={<Divider orientation="vertical" flexItem />}
          alignItems="center"
          sx={{
            '& a': {
              color: 'text.primary',
              textDecoration: 'none',
              transition: 'color 0.15s ease',
            },
            '& a:hover': {
              color: 'primary.main',
            },
          }}
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
          <a href="https://github.com/yag-im" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <NextLink href="/status">
            Status
          </NextLink>
          <a href="https://www.buymeacoffee.com/yagim" target="_blank" rel="noopener noreferrer">
            Support Us
          </a>
        </Stack>

        {/* --- Powered By Logos (pinned right, hidden on small screens) --- */}
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{
            display: { xs: 'none', lg: 'flex' },
            flexShrink: 0,
            'html[data-theme="dark"] & img': {
              filter: 'invert(1) hue-rotate(180deg)',
            },
          }}
        >
          <Typography
            variant="overline"
            sx={{ alignContent: 'center' }}
          >Powered by:</Typography>
          <a href="https://www.igdb.com/">
            <PoweredByImage src={poweredByIgdbLogo} alt="IGDB" />
          </a>
          <a href="https://dosbox-x.com/">
            <PoweredByImage src={poweredByDosBoxXLogo} alt="DOSBox-X" />
          </a>
          <a href="https://www.scummvm.org/">
            <PoweredByImage src={poweredByScummVmLogo} alt="ScummVM" />
          </a>
          <a href="https://www.dosbox.com/">
            <PoweredByImage src={poweredByDosBoxLogo} alt="DOSBox" />
          </a>
          <a href="https://www.winehq.org/">
            <PoweredByImage src={poweredByWineLogo} alt="WineHQ" />
          </a>
          <a href="https://www.retroarch.com/">
            <PoweredByImage src={poweredByRetroArchLogo} alt="RetroArch" />
          </a>
          <a href="https://www.qemu.org/">
            <PoweredByImage src={poweredByQuemuLogo} alt="QEMU" />
          </a>
        </Stack>
      </div>


    </Box>
  );
}

export default Footer;
