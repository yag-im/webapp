"use client";

import AccountSwitch from '@/account/switch';
import { APP_TITLE } from '@/common/common-utils';
import { MyStuffHeaderLink } from '@/my-stuff/my-stuff-header-link';
import { NextLink } from '@/routing/next-link';
import { Box, Divider, Grid, Typography } from '@mui/material';
import Image, { type StaticImageData } from 'next/image';

import { useState } from 'react';

import LogoHint from '@/images/logos/yag.im-logo-hint.png';
import Logo from '@/images/logos/yag.im-logo.png';

type LogoImageProps = Omit<React.ComponentProps<typeof Image>, 'src' | 'alt'> & {
  src: string | StaticImageData;
  alt?: string;
  /** visual scale applied via CSS transform (doesn't affect layout height) */
  scale?: number;
  style?: React.CSSProperties;
};

const LogoImage = ({ src, alt, scale = 1, style, ...rest }: LogoImageProps) => {
  // Apply CSS transform to visually scale the image without affecting layout
  // (transform doesn't change the element's layout box, so header height stays the same)
  const combinedStyle: React.CSSProperties = {
    ...(style || {}),
    display: (style && style.display) ? style.display : 'block',
    transform: `${(style && style.transform) ? `${style.transform} ` : ''}scale(${scale})`,
    transformOrigin: (style && style.transformOrigin) ? style.transformOrigin : 'center center',
  };

  return <Image src={src as any} alt={alt ?? ''} height={52} style={combinedStyle} {...rest} />;
}

export function Header() {
  const [hintPos, setHintPos] = useState<{ x: number; y: number } | null>(null);
  const [showHint, setShowHint] = useState(false);

  const onHintEnter = () => setShowHint(true);
  const onHintLeave = () => setShowHint(false);
  const onHintMove = (e: React.MouseEvent) => {
    // small offset so cursor doesn't overlap image
    setHintPos({ x: e.clientX + 12, y: e.clientY + 12 });
  };
  const hintImg = LogoHint as StaticImageData;

  return (
    <header>
      <Box sx={{ backgroundColor: 'background.paper', color: 'text.primary' }}>
        <Grid container display="flex" alignItems="center" justifyContent="space-around" py={1.5}>
          <Grid item display="flex" alignItems="center" justifyContent="flex-start" xs={8} pl={2}>
            <NextLink href="/">
              <LogoImage src={Logo} alt="YAG.IM Logo" />
            </NextLink>
            <Box display="flex" flexDirection="column" ml={1.5}>
              <NextLink href="/">
                <Typography variant="h5" sx={{ color: 'text.primary' }}>{APP_TITLE.toUpperCase()}</Typography>
              </NextLink>
              <NextLink href="/">
                <Typography
                  variant="body2"
                  fontSize={12}
                  onMouseEnter={onHintEnter}
                  onMouseMove={onHintMove}
                  onMouseLeave={onHintLeave}
                  style={{ display: 'inline-block' }}
                  sx={{ color: 'text.primary' }}
                >
                  [iā´kнim]
                </Typography>
              </NextLink>
            </Box>
          </Grid>
          <Grid item display="flex" justifyContent="flex-end" alignItems="center" pr={2} xs={4}>
            <MyStuffHeaderLink />
            <Box
              sx={{
                display: 'block'
              }}
            >
              <AccountSwitch />
            </Box>
          </Grid>
        </Grid>
        <Divider orientation="horizontal" flexItem />
      </Box>
      {showHint && hintPos && (
        <div
          style={{
            position: 'fixed',
            left: hintPos.x,
            top: hintPos.y,
            zIndex: 9999,
            pointerEvents: 'none',
            transform: 'translate(-50%, 0)',
          }}
        >
          <Image src={hintImg as any} alt="logo hint" width={hintImg.width} height={hintImg.height} />
        </div>
      )}
    </header>
  );
}
