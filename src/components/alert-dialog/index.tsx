import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { FC } from 'react';

type Props = {
    handleClose: () => void;
    handleAccept: () => void;
    open: boolean;
}


const AlertDialog: FC<Props> = ({
    handleClose,
    handleAccept,
    open,
}) => {

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Message:"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you agree to delete the record?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={handleClose}>No</Button>
                    <Button onClick={handleAccept} autoFocus>Yes</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AlertDialog;
