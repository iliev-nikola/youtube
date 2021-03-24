import React, { useState } from 'react';
import styles from './UploadVideo.module.css';
import { TextField, Button } from '@material-ui/core';
import Dropzone from 'react-dropzone';

export default function UploadVideo() {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    let file;
    const changeTitle = (e) => {
        setTitle(e.target.value);
    }
    const changeArtist = (e) => {
        setArtist(e.target.value);
    }
    const onSubmit = () => {
        console.log(file);
    }
    const onDrop = (acceptedFiles) => {
        file = acceptedFiles;
    }
    return (
        <div className={styles.mainContainer}>
            <form onSubmit={onSubmit}>
                <Dropzone
                    onDrop={onDrop}
                    accept="image/png"
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
                <TextField type="text" required className={styles.inputs} size="small" label="Title" variant="outlined" value={title} onChange={changeTitle} />
                <TextField type="text" required size="small" label="Artist" variant="outlined" value={artist} onChange={changeArtist} />
                <Button variant="contained" color="primary" onClick={onSubmit}>Upload</Button>
            </form>
        </div>
    )
}