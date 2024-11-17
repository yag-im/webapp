import AccountSwitch from '@/account/switch';
import { APP_TITLE } from '@/common/common-utils';
import { NextLink } from '@/routing/next-link';
import { Box, Divider, Grid, IconButton, Typography } from '@mui/material';
import Image from 'next/image';

import Logo from '@/images/powered_by/yag.im-logo.svg';
import { GitHub } from '@mui/icons-material';

interface LogoImageProps {
  src: string;
  alt: string;
}

const LogoImage = ({ src, alt, ...rest }: LogoImageProps) => {
  return <Image src={src} alt={alt} height={96} {...rest} />;
}

export function Header() {
  return (
    <header>
      <Grid container display="flex" alignItems="center" justifyContent="space-around">
        <Grid item display="flex" alignItems="center" justifyContent="flex-start" xs={8}>
          <NextLink href="/">
            <LogoImage src={Logo} alt="YAG.IM Logo" />
          </NextLink>
          <Box display="flex" flexDirection="column" ml={0}>
            <NextLink href="/">
              <Typography variant="h4">{APP_TITLE.toUpperCase()}</Typography>
            </NextLink>
            <NextLink href="/">
              <Typography variant="h4" fontSize={16}>[iā´kнim]</Typography>
            </NextLink>
          </Box>
        </Grid>
        <Grid item display="flex" justifyContent="flex-end" pr={2} xs={4}>
          <Box
            sx={{
              display: { md: 'block', xs: "none" }
            }}
          >
            <a href="https://github.com/yag-im" target="_blank" rel="noopener noreferrer">
              <IconButton>
                <GitHub />
              </IconButton>
            </a>
            <AccountSwitch />
          </Box>
        </Grid>
      </Grid>
      <Divider orientation="horizontal" flexItem />
    </header>
  );
}
