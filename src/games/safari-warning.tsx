import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';

export interface SafariWarningDialogProps {
    onExit: () => void;
    disablePortal: boolean; // when false, dialog is not visible in the fullscreen mode
}

export default function SafariWarningDialog(props: SafariWarningDialogProps) {
    const [open, setOpen] = React.useState(true);

    const { onExit, disablePortal = false } = props;

    const handleExitGame = () => {
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
                    Safari browser detected. This game may not work properly due to compatibility issues. Please switch to another browser, such as Google Chrome, for the best experience.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleExitGame}>Exit</Button>
            </DialogActions>
        </Dialog>
    );
}
