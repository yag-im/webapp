import { CDN_URL } from '@/common/common-utils';
import { CardMedia, Divider, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import type { GameReleaseDetailsProps } from './game-details';

export interface ResumeGameDialogProps {
    orphanedGameDetails: GameReleaseDetailsProps;
    onResumeGame: () => void;
    onCloseGame: () => void;
    disablePortal: boolean;
}

export default function ResumeGameDialog(props: ResumeGameDialogProps) {
    const [open, setOpen] = React.useState(true);

    const { orphanedGameDetails: gameDetails, onResumeGame, onCloseGame, disablePortal = false } = props;

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

    const coverImageUrl = `${CDN_URL}/covers/${gameDetails.media_assets.cover.image_id}.jpg`;

    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            disablePortal={disablePortal}
        >
            <DialogTitle id="alert-dialog-title">
                {"Warning"}: &quot;{gameDetails.name}&quot; is still running
            </DialogTitle>
            <Divider />
            <DialogContent>
                <Stack direction="row" spacing={1}>
                    <CardMedia
                        component="img"
                        src={coverImageUrl}
                        alt="Cover Image"
                        sx={{ width: '96px', height: '100%' }} // Adjust styling as needed
                    />
                    <DialogContentText id="alert-dialog-description">
                        This happens when game screen is closed or left open without exiting the game. Would you like to resume playing it? < br /> < br /> < br /> Clicking <b>&quot;Close&quot;</b> means all unsaved progress will be lost.
                    </DialogContentText>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleResumeGame}>Resume</Button>
                <Button variant="text" onClick={handleCloseGame} autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>

    );
}
