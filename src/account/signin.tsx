'use client'

import DiscordLogo from "@/images/logos/discord.svg";
import GoogleLogo from "@/images/logos/google.svg";
import RedditLogo from "@/images/logos/reddit.svg";
import TwitchLogo from "@/images/logos/twitch.svg";
import CloseIcon from '@mui/icons-material/Close';
import { DialogContent } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import * as React from 'react';

interface SignInListItemProps {
    alt: string;
    href: string;
    src: string;
    text: string;
}

const SignInListItem = ({ alt, href, src, text, ...rest }: SignInListItemProps) => {
    return (
        <Button
            href={href}
            style={{
                borderRadius: 12,
                fontSize: 15
            }}
            size="large"
            variant="outlined"
            startIcon={
                <Image
                    src={src}
                    alt={alt}
                    height={48}
                    style={{
                        margin: '8px'
                    }}
                    {...rest}
                />}>
            {text}
        </Button>
    );
};

export interface SignInDialogProps {
    onClose: () => void;
    nextUrl: string;
}

export function SignInDialog(props: SignInDialogProps) {
    const [open, setOpen] = React.useState(true);
    const { onClose, nextUrl } = props;

    const handleClose = () => {
        setOpen(false);
        onClose();
    };

    return (
        <Dialog
            onClose={handleClose}
            open={open}
        >
            <DialogTitle variant="h6">Sign in to play</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 12,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                <Stack spacing={2} margin={'16px'} >
                    <SignInListItem
                        href={`/auth/google?next_url=${nextUrl}`}
                        alt="google"
                        src={GoogleLogo}
                        text="Sign in with Google"
                    />
                    <SignInListItem
                        href={`/auth/discord?next_url=${nextUrl}`}
                        alt="discord"
                        src={DiscordLogo}
                        text="Sign in with Discord"
                    />
                    <SignInListItem
                        href={`/auth/twitch?next_url=${nextUrl}`}
                        alt="twitch"
                        src={TwitchLogo}
                        text="Continue with Twitch"
                    />
                    <SignInListItem
                        href={`/auth/reddit?next_url=${nextUrl}`}
                        alt="reddit"
                        src={RedditLogo}
                        text="Continue with Reddit"
                    />
                </Stack>
            </DialogContent>
        </Dialog>
    );
}

export default function SignInWidget() {
    const [showSignInDialog, setShowSignInDialog] = React.useState(false);
    return (
        <div>
            <Button variant="outlined" onClick={() => { setShowSignInDialog(true); }}>
                Sign in
            </Button>
            {showSignInDialog && <SignInDialog
                onClose={() => { setShowSignInDialog(false); }}
                nextUrl={window.location.href}
            />}
        </div>
    );
}
