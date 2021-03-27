import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import styles from './SignIn.module.scss';
import { auth } from '../../firebase';
import { Link, useHistory } from "react-router-dom";
import { setCurrentUser, validateEmail, login } from '../../utils';
import logo from '../../assets/logo.png';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

export default function SignIn() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState('');
    const [open, setOpen] = useState(false);

    const signInWithEmailAndPasswordHandler = (event, email, password) => {
        event.preventDefault();
        [email, password] = [email.trim(), password.trim()];
        if (!email) {
            setAlert('Enter an email');
        } else if (!validateEmail(email)) {
            setAlert('Enter a valid email');
        } else if (!password) {
            setAlert('Enter a password');
        } else {
            setAlert('');
        }

        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                setEmail('');
                setPassword('');
                setCurrentUser();
                login();
                history.push('/');
            })
            .catch(err => err);
    };

    const onInputChange = (e) => {
        e.preventDefault();
        const { id, value } = e.currentTarget;
        switch (id) {
            case 'email':
                setEmail(value);
                break;
            default:
                setPassword(value);
        }
    };

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
                <Snackbar anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }} open={open} autoHideDuration={7000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">{alert}</Alert>
                </Snackbar>
            </div> : null}
            <form className={styles.signIn}>
                <img src={logo} alt="logo" id={styles.logo} onClick={() => history.push('/')} />
                <h2 className={styles.welcomeText}>Sign in</h2>
                <p className={styles.welcomeText}>to continue to YouTube</p>
                <div className={styles.container}>
                    <TextField type="email" required className={styles.inputs} size="medium" label="Email" variant="outlined" value={email} id="email" onChange={(e) => onInputChange(e)} autoComplete="off" />
                </div>
                <div className={styles.container}>
                    <TextField type="password" required className={styles.inputs} size="medium" label="Password" variant="outlined" value={password} id="password" onChange={(e) => onInputChange(e)} autoComplete="off" />
                </div>
                <div className={styles.buttons}>
                    <Link to="signup" className={styles.link}>Create account</Link>
                    <div className={styles.button}>
                        <Button variant="contained" color="primary"
                            onClick={(e) => {
                                signInWithEmailAndPasswordHandler(e, email, password);
                                handleClick();
                            }}>
                            sign in
                </Button>

                    </div>
                </div>
                <Link to="reset" className={styles.link} >Password reset</Link>

            </form>
        </>
    );
}
