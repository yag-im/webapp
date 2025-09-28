import buyMeACoffeeQr from '@/images/bmc_qr.png';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export function SupportWidget() {
    return (
        <Box
            component="a"
            href="https://www.buymeacoffee.com/yagim"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
                position: 'fixed',
                bottom: 24,       // 👈 changed from top: 96 to bottom: 24
                right: 24,        // still aligned to right
                zIndex: 2000,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: 2,
                boxShadow: 3,
                p: 2,
                width: 200,
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: 6,
                },
            }}
        >
            <Image
                src={buyMeACoffeeQr}
                alt="Buy Me a Coffee QR Code"
                width={128}
                height={128}
                style={{ borderRadius: '8px' }}
            />

            <Typography variant="subtitle1" fontWeight="bold" mt={1} gutterBottom color="text.primary">
                Support the project
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center">
                Enjoy classic adventure games free on <strong>yag.im</strong>!
                Support us to keep these timeless experiences open for everyone.
            </Typography>
        </Box>
    );
}
