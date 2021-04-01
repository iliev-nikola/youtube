import React, { useState } from 'react';
import { TextField, Button, Snackbar } from '@material-ui/core';
import styles from './SignUp.module.scss';
import { auth } from '../../firebase';
import { Link, useHistory } from "react-router-dom";
import { validateEmail } from '../../utils';
import logoBlack from '../../assets/logoBlack.png';
import { Alert } from '@material-ui/lab';

export default function SignUp() {
    const history = useHistory();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [alert, setAlert] = useState(null);
    const [open, setOpen] = useState(false);

    const createUserWithEmailAndPasswordHandler = (event, firstName, lastName, email, password, rePassword) => {
        event.preventDefault();
        setOpen(true);
        [firstName, lastName, email, password, rePassword] = [firstName.trim(), lastName.trim(), email.trim(), password.trim(), rePassword.trim()];
        if (!firstName) {
            return setAlert('Enter a first name');
        } else if (!lastName) {
            return setAlert('Enter a last name');
        } else if (!email) {
            return setAlert('Enter an email');
        } else if (!validateEmail(email)) {
            return setAlert('Enter a valid email');
        } else if (!password) {
            return setAlert('Enter a password');
        } else if (!rePassword) {
            return setAlert('Confirm password');
        } else if (password !== rePassword) {
            return setAlert('Passwords didn\'t match');
        }

        setOpen(false);
        auth.createUserWithEmailAndPassword(email, password)
            .then((res) => {
                let displayName = firstName[0].toUpperCase() + firstName.slice(1).toLowerCase() + ' ' + lastName[0].toUpperCase() + lastName.slice(1).toLowerCase();
                const user = res.user;
                return user.updateProfile({
                    displayName: displayName
                });
            })
            .then(() => {
                setFirstName('');
                setLastName('');
                setEmail('');
                setPassword('');
                setRePassword('');
                auth.signOut();
                history.push('/signin');
            })
            .catch(err => {
                setOpen(true);
                setAlert(err.message);
            });
    };

    const onInputChange = (e) => {
        e.preventDefault();
        const { id, value } = e.currentTarget;
        switch (id) {
            case 'firstName':
                setFirstName(value);
                break;
            case 'lastName':
                setLastName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                setRePassword(value);
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

    // const handleKeyPress = (e) => {
    //     if (e.code === 'Enter') {
    //         createUserWithEmailAndPasswordHandler(e, firstName, lastName, email, password, rePassword);
    //         handleClick();
    //     }
    // }

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
            <form className={styles.signUp} action="/signin" method='POST'>
                <img src={logoBlack} alt="logo" id={styles.logo} onClick={() => history.push('/')} />
                <div className={styles.welcomeText}>
                    <h2>Create your Account</h2>
                    <p>to continue to YouTube</p>
                </div>
                <div className={styles.container}>
                    <TextField required className={styles.inputs} size="small" label="First name" variant="outlined" value={firstName} onChange={(e) => onInputChange(e)} id="firstName" autoComplete="new-password" />
                    <TextField required className={styles.inputs} size="small" label="Last name" variant="outlined" value={lastName} id="lastName" onChange={(e) => onInputChange(e)} autoComplete="new-password" />
                </div>
                <div className={styles.emailContainer}>
                    <TextField required type="email" size="small" fullWidth label="Email" variant="outlined" value={email} id="email" onChange={(e) => onInputChange(e)} autoComplete="off" />
                </div>
                <div className={styles.container}>
                    <TextField required type="password" className={styles.inputs} size="small" label="Password" variant="outlined" value={password} id="password" onChange={(e) => onInputChange(e)} />
                    <TextField required type="password" className={styles.inputs} size="small" label="Confirm" variant="outlined" value={rePassword} id="rePassword" onChange={(e) => onInputChange(e)} />
                </div>
                <p id={styles.info}>Use 6 or more characters</p>
                <div className={styles.buttons}>
                    <Link to="signin" className={styles.link}>Sign in instead</Link>
                    <div className={styles.button}>
                        <Button variant="contained" color="primary"
                            onClick={(e) => {
                                createUserWithEmailAndPasswordHandler(e, firstName, lastName, email, password, rePassword);
                            }}>
                            sign up
                </Button>
                    </div>
                </div>
                <Link to="reset" className={styles.link} >Password reset</Link>
            </form>
        </>
    );
}
