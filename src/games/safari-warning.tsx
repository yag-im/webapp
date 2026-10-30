import { analytics } from '@/analytics/track';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import type { WebKitPlatform } from './game-player-helpers';
import * as React from 'react';

export interface SafariWarningDialogProps {
    onExit: () => void;
    disablePortal: boolean; // when false, dialog is not visible in the fullscreen mode
    itemId?: string;
    platform: WebKitPlatform;
}

const WARNING_TEXT: Record<WebKitPlatform, string> = {
    safari: 'Safari browser detected. This game may not work properly due to compatibility issues. Please switch to another browser, such as Google Chrome, for the best experience.',
    ios: 'This game may not work properly on iPhone or iPad due to browser compatibility issues. All browsers on iOS and iPadOS share the same limitations, so switching browsers will not help. Please use a desktop computer (Windows, macOS or Linux) with Google Chrome for the best experience.',
};

export default function SafariWarningDialog(props: SafariWarningDialogProps) {
    const [open, setOpen] = React.useState(true);

    const { onExit, disablePortal = false, itemId = '', platform } = props;

    React.useEffect(() => {
        analytics.safariWarningShown({
            item_id: itemId,
            platform,
            ua: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
        });
    }, [itemId, platform]);

    const handleExitGame = () => {
        analytics.safariWarningDismissed({ item_id: itemId });
        onExit();
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            disablePortal={disablePortal}
        >
            <DialogTitle id="alert-dialog-title">
                {"Warning"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {WARNING_TEXT[platform]}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleExitGame}>Exit</Button>
            </DialogActions>
        </Dialog>
    );
}
