import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';
import styles from './Dialogs.module.scss';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

export default function FormDialog({ handleClose, onEditClick, open, video }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [alert, setAlert] = useState(null);
    const [openAlert, setOpenAlert] = useState(false);
    const handleClick = () => {
        setOpenAlert(true);
    };
    const handleCloseAlert = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    const onSubmit = () => {
        handleClick();

        if (!title.trim()) {
            return setAlert('Please add a title!');
        } else if (!description.trim()) {
            return setAlert('Please add a description!');
        } else if (description.trim().length < 10) {
            return setAlert('The description must be atleast 10 characters');
        }

        setTitle('');
        setDescription('');
        onEditClick(title, description);
    };

    const onTitleChange = (e) => {
        e.preventDefault();
        setTitle(e.target.value);
    };

    const onDescriptionChange = (e) => {
        e.preventDefault();
        setDescription(e.target.value);
    };

    return (
        <>
            {alert ? <div className={styles.alert}>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={openAlert}
                    autoHideDuration={5000}
                    onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity='error'>{alert}</Alert>
                </Snackbar>
            </div> : null}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="dialog-title"
                fullWidth
            >
                <div className={styles.formDialog}>
                    <DialogTitle id="dialog-title">
                        Update
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {video ? video.title : null}
                        </DialogContentText>
                    </DialogContent>
                    <div className={styles.inputs}>
                        <TextField required fullWidth type="text" size="small" label="New title" variant="outlined" value={title} onChange={(e) => onTitleChange(e)} className={styles.input} />
                        <TextField required fullWidth type="text" size="medium" label="New description" variant="outlined" value={description} onChange={(e) => onDescriptionChange(e)} />
                    </div>
                    <DialogActions>
                        <Button autoFocus onClick={() => {
                            handleClose();
                            setTitle('');
                            setDescription('');
                        }} color="primary">
                            Cancel
                    </Button>
                        <Button onClick={onSubmit} color="primary">
                            Update
                    </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </>
    );
}