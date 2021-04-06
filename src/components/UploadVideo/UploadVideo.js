import React, { useCallback, useEffect, useState } from 'react';
import styles from './UploadVideo.module.scss';
import { TextField, Button, Snackbar } from '@material-ui/core';
import Dropzone from 'react-dropzone';
import logoBlack from '../../assets/logoBlack.png';
import { useHistory } from 'react-router';
import { db, storage } from '../../firebase';
import CircularStatic from '../ProgressBar/CircularProgress';
import { generateId, getDate } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { setAlertOn } from '../../redux/actions/alertNotifier';
import { getUser } from '../../redux/selectors/user';

export default function UploadVideo() {
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(null);
    const dispatch = useDispatch();
    const user = useSelector(getUser);
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
        const titleValue = e.target.value;
        if (titleValue.length > 40) {
            return dispatch(setAlertOn('warning', 'Title cannot exceed 40 characters'));
        }
        setTitle(titleValue);
    };
    const changeDescription = (e) => {
        const desciptionValue = e.target.value;
        if (desciptionValue.length > 100) {
            return dispatch(setAlertOn('warning', 'Description cannot exceed 100 characters'));
        }
        setDescription(desciptionValue);
    };

    const onDrop = useCallback(acceptedFiles => {
        if (!acceptedFiles[0]) {
            return dispatch(setAlertOn('error', 'File size must not exceed 5 MB'));
        }
        setFile(acceptedFiles[0]);
    }, []);

    const onSubmit = () => {
        if (!title.trim()) {
            return dispatch(setAlertOn('error', 'Please add a title!'));
        } else if (title.trim().length < 10) {
            return dispatch(setAlertOn('error', 'Title must be atleast 10 characters!'));
        } else if (!description.trim()) {
            return dispatch(setAlertOn('error', 'Please add a description!'));
        } else if (description.trim().length < 10) {
            return dispatch(setAlertOn('error', 'The description must be at least 10 characters!'));
        }

        const uploadTask = storage.ref().child(`videos/${title}`).put(file);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const currentProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(currentProgress);
            },
            (error) => { return dispatch(setAlertOn('error', error.message)) },
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
                            views: 0,
                            isLikedBy: [],
                            isDislikedBy: [],
                            isWatchedBy: []
                        })
                    })
                    .then(() => {
                        dispatch(setAlertOn('success', 'Video successfully uploaded'));
                    })
                    .catch(err => dispatch(setAlertOn('error', err.message)));
            }
        )
    }
    return (
        <div className={styles.mainContainer}>
            <img src={logoBlack} alt='youtube logo' id={styles.logo} onClick={() => history.push('/')} />
            <form onSubmit={onSubmit}>
                <Dropzone
                    onDrop={onDrop}
                    accept="video/*"
                    multiple={false}
                    maxFiles={1}
                    maxSize={5242880}
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
                    : <h2 className={styles.welcomeText}>max file size: 5 mb</h2>
                }
                {progress ? <CircularStatic percentage={progress} /> : null}
                <div className={styles.inputs}>
                    <TextField type="text" required fullWidth className={styles.input} size="small" label="Title" variant="outlined" value={title} onChange={changeTitle} />
                    <TextField type="text" required size="medium" fullWidth className={styles.input} label="Description" variant="outlined" value={description} onChange={changeDescription} />
                </div>
                {file ?
                    <Button variant="contained" color="primary" onClick={onSubmit}>Upload</Button>
                    : null
                }
            </form>
        </div >
    )
}