import React, { useCallback, useEffect, useState } from 'react';
import styles from './UploadVideo.module.scss';
import { TextField, Button, Snackbar } from '@material-ui/core';
import Dropzone from 'react-dropzone';
import logoBlack from '../../assets/logoBlack.png';
import { useHistory } from 'react-router';
import { auth, db, storage } from '../../firebase';
import CircularStatic from '../ProgressBar/CircularProgress';
import { Alert } from '@material-ui/lab';
import { generateId, getDate } from '../../utils';

export default function UploadVideo() {
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(null);
    const [alert, setAlert] = useState(null);
    const [open, setOpen] = useState(false);
    const [alertType, setAlertType] = useState('error');
    const user = auth.currentUser;
    useEffect(() => {
        if (progress >= 100) {
            setTimeout(() => {
                setTitle('');
                setDescription('');
            }, 1500);

            setTimeout(() => {
                setFile(null);
                setProgress(null)
            }, 5000);
        }
    }, [progress]);
    const changeTitle = (e) => {
        setTitle(e.target.value);
    }
    const changeDescription = (e) => {
        setDescription(e.target.value);
    }

    const onDrop = useCallback(acceptedFiles => {
        setFile(acceptedFiles[0]);
    }, []);

    const onSubmit = () => {
        handleClick();
        if (!title.trim()) {
            return setAlert('Please add a title!');
        } else if (!description.trim()) {
            return setAlert('Please add a description!');
        } else if (description.trim().length < 10) {
            return setAlert('The description must be at least 10 characters');
        }

        setAlert(null);
        const uploadTask = storage.ref().child(`videos/${title}`).put(file);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const currentProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(currentProgress);
            },
            (error) => { return setAlert(error) },
            () => {
                uploadTask.snapshot.ref.getDownloadURL()
                    .then(downloadUrl => {
                        const id = generateId();
                        db.collection('videos').doc(id).set({
                            id: id,
                            title: title,
                            description: description,
                            url: downloadUrl,
                            author: user.displayName,
                            authorID: user.uid,
                            authorPhotoURL: user.photoURL,
                            date: getDate(),
                            views: 0,
                            isLikedBy: [],
                            isDislikedBy: [],
                            isWatchedBy: []
                        })
                    })
                    .then(() => {
                        setAlertType('success');
                        setAlert('Video successfully uploaded');
                    })
                    .catch(err => setAlert(err.message));
            }
        )
    }

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    return (
        <>
            {alert ? <div className={styles.alert}>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    autoHideDuration={5000}
                    onClose={handleClose}>
                    <Alert onClose={handleClose} severity={alertType}>{alert}</Alert>
                </Snackbar>
            </div> : null}
            <div className={styles.mainContainer}>
                <img src={logoBlack} alt='youtube logo' id={styles.logo} onClick={() => history.push('/')} />
                <form onSubmit={onSubmit}>
                    <Dropzone
                        onDrop={onDrop}
                        accept="video/*"
                        multiple={false}
                        maxFiles={1}
                    >
                        {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
                            <div {...getRootProps()} className={styles.uploadContainer}>
                                <input {...getInputProps()} />
                                {!isDragActive && 'Click here or drop a file to upload!'}
                                {isDragActive && !isDragReject && "Drop it like it's hot!"}
                                {isDragReject && "File type not accepted, sorry!"}
                            </div>
                        )}
                    </Dropzone>
                    {file ?
                        <ul className={styles.fileInfo}>
                            <li>file: {file.name}</li>
                            <li>size: {(+file.size / 1000000).toFixed(2)} MB</li>
                        </ul>
                        : null
                    }
                    {progress ? <CircularStatic percentage={progress} /> : null}
                    <div className={styles.inputs}>
                        <TextField type="text" required fullWidth className={styles.input} size="small" label="Title" variant="outlined" value={title} onChange={changeTitle} />
                        <TextField type="text" required size="large" fullWidth label="Description" variant="outlined" value={description} onChange={changeDescription} />
                    </div>
                    {file ?
                        <Button variant="contained" color="primary" onClick={onSubmit}>Upload</Button>
                        : null
                    }
                </form>
            </div >
        </>
    )
}