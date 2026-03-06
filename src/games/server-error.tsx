import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';

export interface ServerErrorDialogProps {
    onClose: () => void;
    disablePortal: boolean; // when false, dialog is not visible in the fullscreen mode
}

export default function ServerErrorDialog(props: ServerErrorDialogProps) {
    const [open, setOpen] = React.useState(true);

    const { onClose, disablePortal = false } = props;

    const handleClose = () => {
        onClose();
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            aria-labelledby="server-error-dialog-title"
            aria-describedby="server-error-dialog-description"
            disablePortal={disablePortal}
        >
            <DialogTitle id="server-error-dialog-title">
                {"Service Unavailable"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="server-error-dialog-description">
                    We&apos;re sorry, all available game streaming servers are currently at capacity. Please try again later.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>OK</Button>
            </DialogActions>
        </Dialog>
    );
}
