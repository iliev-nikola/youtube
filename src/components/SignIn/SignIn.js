import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import styles from './SignIn.module.scss';
import { auth, googleProvider, facebookProvider, gitHubProvider, db } from '../../firebase';
import { Link, useHistory } from "react-router-dom";
import { validateEmail } from '../../utils';
import logoBlack from '../../assets/logoBlack.png';
import gitHubLogo from '../../assets/gitHubLogo.png';
import facebookLogo from '../../assets/facebookLogo.png';
import googleLogo from '../../assets/googleLogo.png';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

export default function SignIn() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState(null);
    const [open, setOpen] = useState(false);

    const onProviderClick = (provider) => {
        auth.signInWithPopup(provider)
            .then(() => {
                history.push('/');
            })
            .catch(error => {
                setAlert(error.message);
            });
    }

    const signInWithEmailAndPasswordHandler = (event, email, password) => {
        event.preventDefault();
        [email, password] = [email.trim(), password.trim()];
        if (!email) {
            return setAlert('Enter an email');
        } else if (!validateEmail(email)) {
            return setAlert('Enter a valid email');
        } else if (!password) {
            return setAlert('Enter a password');
        }

        auth.signInWithEmailAndPassword(email, password)
            .then(res => {
                setEmail('');
                setPassword('');
                history.push('/');
                return res;
            })
            .then(res => {
                const data = {
                    displayName: res.user.displayName,
                    email: res.user.email,
                    photoURL: res.user.photoURL,
                    uid: res.user.uid,
                }
                db.collection('users').where('uid', '==', res.user.uid).get()
                    .then(res => {
                        if (!res.docs.length) {
                            db.collection('users').doc(data.uid).set(data);
                        }

                    })
                    .catch(err => {
                        setAlert(err.message);
                    });
            })
            .catch(err => {
                setAlert(err.message);
            });
    }

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
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    autoHideDuration={5000}
                    onClose={handleClose}>
                    <Alert onClose={handleClose} severity='error'>{alert}</Alert>
                </Snackbar>
            </div> : null}
            <form className={styles.signIn} >
                <img src={logoBlack} alt="logo" id={styles.logo} onClick={() => history.push('/')} />
                <div className={styles.welcomeText}>
                    <h2>Sign in</h2>
                    <p>to continue to YouTube</p>
                </div>
                <div className={styles.container}>
                    <TextField type="email" required className={styles.inputs} size="medium" label="Email" variant="outlined" value={email} id="email" onChange={(e) => onInputChange(e)} autoComplete="off" />
                </div>
                <div className={styles.container}>
                    <TextField type="password" required className={styles.inputs} size="medium" label="Password" variant="outlined" value={password} id="password" onChange={(e) => onInputChange(e)} autoComplete="off" />
                </div>
                <p className={styles.loginWithText}>Login with:</p>
                <div className={styles.buttons}>
                    <div className={styles.socialIcons}>
                        <img onClick={() => onProviderClick(facebookProvider)} src={facebookLogo} alt='Facebook logo' className={styles.logo} />
                        <img onClick={() => onProviderClick(googleProvider)} src={googleLogo} alt='Google logo' className={styles.logo} />
                        <img onClick={() => onProviderClick(gitHubProvider)} src={gitHubLogo} alt='GitHub logo' className={styles.logo} />
                    </div>
                    <p>or</p>
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
                <div className={styles.options}>
                    <Link to="signup" className={styles.link}>Create account</Link>
                    <Link to="reset" className={styles.link} >Password reset</Link>
                </div>
            </form>
        </>
    );
}
