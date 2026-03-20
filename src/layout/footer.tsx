import poweredByDosBoxLogo from '@/images/powered_by/dosbox-logo.svg';
import poweredByDosBoxXLogo from '@/images/powered_by/dosbox-x-logo.svg';
import poweredByIgdbLogo from '@/images/powered_by/IGDB-logo.svg';
import poweredByQuemuLogo from '@/images/powered_by/QEMU-logo.svg';
import poweredByRetroArchLogo from '@/images/powered_by/RetroArch-logo.svg';
import poweredByScummVmLogo from '@/images/powered_by/ScummVM-logo.svg';
import poweredByWineLogo from '@/images/powered_by/WINE-logo.svg';
import { NextLink } from '@/routing/next-link';
import { Divider, Stack, Typography } from '@mui/material';
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
        borderTop: '1px solid rgba(0,0,0,0.06)',
        position: 'sticky',
        bottom: 0,
        backgroundColor: '#ffffff',
        zIndex: 10,
        padding: '8px 0',
      }}
    >
      <div style={{ position: 'relative', width: '100%', padding: '4px 16px' }}>
        {/* --- Legal Links (centered across full width) --- */}
        <Stack
          direction="row"
          spacing={{ xs: 1, sm: 1.5, md: 2 }}
          flexWrap="wrap"
          divider={<Divider orientation="vertical" flexItem />}
          justifyContent="center"
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
          <NextLink href="/status" className="text-black">
            Status
          </NextLink>
          <a href="https://www.buymeacoffee.com/yagim" target="_blank" rel="noopener noreferrer" className="text-black">
            Support Us
          </a>
        </Stack>

        {/* --- Powered By Logos (pinned right, hidden on small screens) --- */}
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{
            position: 'absolute',
            right: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            display: { xs: 'none', lg: 'flex' },
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


    </footer>
  );
}

export default Footer;
