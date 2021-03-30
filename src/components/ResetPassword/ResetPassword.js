import React, { useState } from 'react';
import { TextField, Button, Snackbar } from '@material-ui/core';
import styles from '../SignIn/SignIn.module.scss';
import { auth } from '../../firebase';
import { Link, useHistory } from "react-router-dom"
import logoBlack from '../../assets/logoBlack.png';
import { validateEmail } from '../../utils';
import { Alert } from '@material-ui/lab';

export default function ResetPassword() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
    const [alert, setAlert] = useState('');
    const [open, setOpen] = useState(false);
    const sendResetEmail = (event) => {
        event.preventDefault();
        setOpen(true);
        if (!email.trim()) {
            return setAlert('Enter an email');
        } else if (!validateEmail(email)) {
            return setAlert('Enter a valid email');
        }

        auth.sendPasswordResetEmail(email)
            .then(() => {
                setEmailHasBeenSent(true);
                setTimeout(() => { setEmailHasBeenSent(false) }, 3000);
            })
            .catch(err => setAlert(err.message));
    };

    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const onInputChange = (e) => {
        e.preventDefault();
        const { value } = e.currentTarget;
        setEmail(value);
    };

    return (
        <>
            <div className={styles.alert}>
                <Snackbar anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }} open={open} autoHideDuration={7000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">{alert}</Alert>
                </Snackbar>
            </div>
            <form className={styles.signIn} >
                <img src={logoBlack} alt="logo" id={styles.logo} onClick={() => history.push('/')} />
                <div className={styles.welcomeText}>
                    <h2>Reset your password</h2>
                    <p>to continue to YouTube</p>
                </div>
                {emailHasBeenSent && (
                    <div className="py-3 bg-green-400 w-full text-white text-center mb-3">
                        An email has been sent to you!
                    </div>
                )}
                <div className={styles.container}>
                    <TextField type="email" name="new-password" required className={styles.inputs} size="medium" label="Email" variant="outlined" value={email} id="email" onChange={(e) => onInputChange(e)} autoComplete="new-password" />
                </div>
                <div className={styles.buttons}>
                    <Link to="signin" className={styles.link}>Sign in instead</Link>
                    <div className={styles.button}>
                        <Button variant="contained" color="primary"
                            onClick={(e) => sendResetEmail(e)}>
                            reset
                </Button>
                    </div>
                </div>
            </form>
        </>
    );
}
