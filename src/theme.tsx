'use client';

import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});


const theme = createTheme({
  palette: {
    primary: {
      main: '#663399',
    },
    secondary: {
      main: '#336633',
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    h7: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
      letterSpacing: '0.02em',
      color: '#000',
    },
    h4: {
      fontSize: '2rem',
      fontWeight: 400,
      color: '#1a1a1a',
    },
  },
});

export default theme;
