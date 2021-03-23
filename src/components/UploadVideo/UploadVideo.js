import React, { useState } from 'react';
import styles from './UploadVideo.module.css';
import { TextField, Button } from '@material-ui/core';
import Dropzone from 'react-dropzone';
export default function UploadVideo() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const changeTitle = (e) => {
        setTitle(e.target.value);
    }
    const changeAuthor = (e) => {
        setAuthor(e.target.value);
    }
    const onSubmit = (e) => {
    }
    const onDrop = (acceptedFiles) => {
        console.log(acceptedFiles);
    }
    return (
        <div className={styles.mainContainer}>
            <form onSubmit={onSubmit}>
                <Dropzone
                    onDrop={onDrop}
                    accept="image/png"
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
                <TextField type="text" className={styles.inputs} size="small" label="Title" variant="outlined" value={title} onChange={changeTitle} />
                <TextField type="text" size="small" label="Author" variant="outlined" value={author} onChange={changeAuthor} />
                <Button variant="contained" color="primary" onClick={onSubmit}>Upload</Button>
            </form>
        </div>
    )
}