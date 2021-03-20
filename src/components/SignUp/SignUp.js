import React from 'react';
import { TextField, Button } from '@material-ui/core';
import styles from './SignUp.module.css';

export default function SignUp() {
    return (
        <div className={styles.signUp}>
            <div className={styles.container}>
                <TextField className={styles.inputs} size="small" label="First name" variant="outlined" />
                <TextField className={styles.inputs} size="small" label="Last name" variant="outlined" />
            </div>
            <div className={styles.emailContainer}>
                <TextField size="small" fullWidth label="Email" variant="outlined" />
            </div>
            <div className={styles.container}>
                <TextField className={styles.inputs} size="small" label="Password" variant="outlined" />
                <TextField className={styles.inputs} size="small" label="Confirm" variant="outlined" />
            </div>
            <div className={styles.button}>
                <Button variant="contained" color="primary">
                    Link
            </Button>
            </div>
        </div>
    );
}