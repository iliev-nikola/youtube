import React, { useState } from 'react';
import { TextField, Button, Snackbar } from '@material-ui/core';
import styles from './SignUp.module.scss';
import { auth } from '../../firebase';
import { Link, useHistory } from "react-router-dom";
import { validateEmail } from '../../utils';
import logoBlack from '../../assets/logoBlack.png';
import { Alert } from '@material-ui/lab';
import { useDispatch } from 'react-redux';
import { setAlertOn } from '../../redux/actions/alertNotifier';


export default function SignUp() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const createUserWithEmailAndPasswordHandler = (event, firstName, lastName, email, password, rePassword) => {
        event.preventDefault();
        [firstName, lastName, email, password, rePassword] = [firstName.trim(), lastName.trim(), email.trim(), password.trim(), rePassword.trim()];
        if (!firstName) {
            return dispatch(setAlertOn('error', 'Enter a first name'));
        } else if (!lastName) {
            return dispatch(setAlertOn('error', 'Enter a last name'));
        } else if (!email) {
            return dispatch(setAlertOn('error', 'Enter an email'));
        } else if (!validateEmail(email)) {
            return dispatch(setAlertOn('error', 'Enter a valid email'));
        } else if (!password) {
            return dispatch(setAlertOn('error', 'Enter a password'));
        } else if (!rePassword) {
            return dispatch(setAlertOn('error', 'Confirm password'));
        } else if (password !== rePassword) {
            return dispatch(setAlertOn('error', 'Passwords didn\'t match'));
        }

        auth.createUserWithEmailAndPassword(email, password)
            .then((res) => {
                const displayName = firstName[0].toUpperCase() + firstName.slice(1).toLowerCase() + ' ' + lastName[0].toUpperCase() + lastName.slice(1).toLowerCase();
                const user = res.user;
                console.log(user, displayName)
                return user.updateProfile({
                    displayName: displayName
                });
            })
            .then(() => {
                dispatch(setAlertOn('success', 'Registration successfull'));
                setFirstName('');
                setLastName('');
                setEmail('');
                setPassword('');
                setRePassword('');
                history.replace('/signin');
            })
            .catch(err => dispatch(setAlertOn('error', err.message)));
    };

    const onInputChange = (e) => {
        e.preventDefault();
        const { id, value } = e.currentTarget;
        switch (id) {
            case 'firstName':
                if (value.length > 15) {
                    return dispatch(setAlertOn('error', 'First name cannot exceed 15 characters'));
                }
                setFirstName(value);
                break;
            case 'lastName':
                if (value.length > 15) {
                    return dispatch(setAlertOn('error', 'Last name cannot exceed 15 characters'));
                }
                setLastName(value);
                break;
            case 'email':
                if (value.length > 30) {
                    return dispatch(setAlertOn('error', 'Email cannot exceed 30 characters'));
                }
                setEmail(value);
                break;
            case 'password':
                if (value.includes(' ')) return;
                if (value.length > 15) {
                    return dispatch(setAlertOn('error', 'Password cannot exceed 15 characters'));
                }
                setPassword(value);
                break;
            default:
                if (value.includes(' ')) return;
                if (value.length > 15) {
                    return dispatch(setAlertOn('error', 'Password cannot exceed 15 characters'));
                }
                setRePassword(value);
        }
    };

    return (
        <form className={styles.signUp} >
            <img src={logoBlack} alt="logo" id={styles.logo} onClick={() => history.push('/')} />
            <div className={styles.welcomeText}>
                <h2>Create your Account</h2>
                <p>to continue to YouTube</p>
            </div>
            <div className={styles.container}>
                <TextField required className={styles.inputs} fullWidth size="small" label="First name" variant="outlined" value={firstName} onChange={onInputChange} id="firstName" autoComplete="new-password" />
                <TextField required className={styles.inputs} size="small" label="Last name" variant="outlined" value={lastName} id="lastName" onChange={onInputChange} autoComplete="new-password" />
            </div>
            <div className={styles.emailContainer}>
                <TextField required type="email" className={styles.emailInput} size="small" fullWidth label="Email" variant="outlined" value={email} id="email" onChange={onInputChange} autoComplete="off" />
            </div>
            <div className={styles.container}>
                <TextField required type="password" className={styles.inputs} size="small" label="Password" variant="outlined" value={password} id="password" onChange={onInputChange} />
                <TextField required type="password" className={styles.inputs} size="small" label="Confirm" variant="outlined" value={rePassword} id="rePassword" onChange={onInputChange} />
            </div>
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
    );
}
