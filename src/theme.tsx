'use client';

import { createTheme, type Theme } from '@mui/material/styles';
import { Inter } from 'next/font/google';

export type ColorMode = 'light' | 'dark';

const inter = Inter({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const lightPalette = {
  primary: { main: '#5b2d8e', dark: '#3e1f63', light: '#8258b5' },
  secondary: { main: '#2e7d52' },
  background: { default: '#f8f9fb', paper: '#ffffff' },
  text: { primary: '#1a1a2e', secondary: '#555770' },
  divider: 'rgba(0,0,0,0.08)',
};

const darkPalette = {
  primary: { main: '#a78bd9', dark: '#c7b3ea', light: '#8258b5' },
  secondary: { main: '#68b892' },
  background: { default: '#121218', paper: '#1c1c24' },
  text: { primary: '#f1f1f5', secondary: '#a5a7bd' },
  divider: 'rgba(255,255,255,0.12)',
};

export function createAppTheme(mode: ColorMode): Theme {
  const isDark = mode === 'dark';
  const palette = isDark ? darkPalette : lightPalette;

  return createTheme({
    palette: {
      mode,
      ...palette,
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: inter.style.fontFamily,
      h4: {
        fontSize: '1.75rem',
        fontWeight: 700,
        letterSpacing: '-0.01em',
        color: palette.text.primary,
      },
      h5: {
        fontSize: '1.35rem',
        fontWeight: 700,
        letterSpacing: '-0.01em',
      },
      h6: {
        fontSize: '1.1rem',
        fontWeight: 600,
      },
      h7: {
        fontSize: '0.95rem',
        fontWeight: 600,
        lineHeight: 1.5,
        letterSpacing: '0.01em',
        color: palette.text.secondary,
      },
      subtitle1: {
        fontWeight: 500,
      },
      body1: {
        lineHeight: 1.7,
      },
      body2: {
        color: palette.text.secondary,
      },
      button: {
        fontWeight: 600,
        textTransform: 'none',
      },
      overline: {
        fontWeight: 600,
        letterSpacing: '0.08em',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '6px 20px',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: isDark
              ? '0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)'
              : '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
            transition: 'box-shadow 0.2s ease, transform 0.2s ease',
            '&:hover': {
              boxShadow: isDark
                ? '0 8px 24px rgba(0,0,0,0.6)'
                : '0 8px 24px rgba(0,0,0,0.1)',
              transform: 'translateY(-2px)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow: isDark
              ? '0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)'
              : '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
            backgroundImage: 'none',
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: palette.divider,
          },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 500,
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 16,
            padding: 8,
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: palette.background.default,
            color: palette.text.primary,
          },
        },
      },
    },
  });
}

const theme = createAppTheme('light');

export default theme;
