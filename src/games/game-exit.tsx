import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';

export interface ExitGameDialogProps {
    onResumeGame: () => void;
    onCloseGame: () => void;
    disablePortal: boolean; // when false, dialog is not visible in the fullscreen mode
}

export default function ExitGameDialog(props: ExitGameDialogProps) {
    const [open, setOpen] = React.useState(true);

    const { onResumeGame, onCloseGame, disablePortal = false } = props;

    const handleClose = () => {
        setOpen(false);
    };

    const handleResumeGame = () => {
        handleClose();
        onResumeGame();
    };

    const handleCloseGame = () => {
        handleClose();
        onCloseGame();
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
                    Are you sure you want to exit?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleResumeGame}>CONTINUE IN FULLSCREEN</Button>
                <Button onClick={handleCloseGame} autoFocus>
                    EXIT GAME (progress will be lost)
                </Button>
            </DialogActions>
        </Dialog>
    );
}
