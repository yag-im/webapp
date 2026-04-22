'use client';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import { createAppTheme, type ColorMode } from './theme';

type ColorModeContextValue = {
    mode: ColorMode;
    toggleColorMode: () => void;
    setColorMode: (mode: ColorMode) => void;
};

const ColorModeContext = React.createContext<ColorModeContextValue>({
    mode: 'light',
    toggleColorMode: () => { },
    setColorMode: () => { },
});

const STORAGE_KEY = 'color-mode';

export function useColorMode(): ColorModeContextValue {
    return React.useContext(ColorModeContext);
}

export function ColorModeProvider({ children }: React.PropsWithChildren) {
    const [mode, setMode] = React.useState<ColorMode>('light');

    React.useEffect(() => {
        try {
            const stored = window.localStorage.getItem(STORAGE_KEY);
            if (stored === 'light' || stored === 'dark') {
                setMode(stored);
            } else if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
                setMode('dark');
            }
        } catch {
            // ignore storage errors
        }
    }, []);

    React.useEffect(() => {
        if (typeof document !== 'undefined') {
            document.documentElement.dataset.theme = mode;
        }
    }, [mode]);

    const contextValue = React.useMemo<ColorModeContextValue>(
        () => ({
            mode,
            toggleColorMode: () => {
                setMode((prev: ColorMode) => {
                    const next: ColorMode = prev === 'light' ? 'dark' : 'light';
                    try {
                        window.localStorage.setItem(STORAGE_KEY, next);
                    } catch {
                        // ignore
                    }
                    return next;
                });
            },
            setColorMode: (next: ColorMode) => {
                setMode(next);
                try {
                    window.localStorage.setItem(STORAGE_KEY, next);
                } catch {
                    // ignore
                }
            },
        }),
        [mode],
    );

    const theme = React.useMemo(() => createAppTheme(mode), [mode]);

    return (
        <ColorModeContext.Provider value={contextValue}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}
