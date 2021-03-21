import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import styles from './SignUp.module.css';
import { auth, generateUserDocument, firestore } from '../../firebase';
import { Link, useHistory } from "react-router-dom"
import { validateEmail } from '../../utils'


export default function SignUp() {
    const history = useHistory();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const createUserWithEmailAndPasswordHandler = (event, firstName, lastName, email, password, rePassword) => {
        event.preventDefault();
        [firstName, lastName, email, password, rePassword] = [firstName.trim(), lastName.trim(), email.trim(), password.trim(), rePassword.trim()];
        if (!firstName) {
            return alert('Enter a first name');
        } else if (!lastName) {
            return alert('Enter a last name');
        } else if (!email) {
            return alert('Enter an email');
        } else if (!validateEmail(email)) {
            return alert('Enter a valid email');
        } else if (!password) {
            return alert('Enter a password');
        } else if (!rePassword) {
            return alert('Confirm password');
        } else if (password !== rePassword) {
            return alert('Passwords didn\'t match');
        }

        auth.createUserWithEmailAndPassword(email, password)
            .then((res) => {
                let displayName = firstName[0].toUpperCase() + firstName.slice(1).toLowerCase() + ' ' + lastName[0].toUpperCase() + lastName.slice(1).toLowerCase();
                const data = {
                    names: displayName,
                    email: email,
                    videos: [],
                    history: []
                }
                const user = auth.currentUser;
                user.updateProfile({
                    displayName: displayName,
                });
                firestore.collection('users').doc(res.uid).set(data);
                setFirstName('');
                setLastName('');
                setEmail('');
                setPassword('');
                setRePassword('');
                history.push('/signin');
            })
            .catch(err => alert(err));
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

    return (
        <form className={styles.signUp}>
            <div className={styles.container}>
                <TextField className={styles.inputs} size="small" label="First name" variant="outlined" value={firstName} onChange={(e) => onInputChange(e)} id="firstName" autoComplete="off" />
                <TextField className={styles.inputs} size="small" label="Last name" variant="outlined" value={lastName} id="lastName" onChange={(e) => onInputChange(e)} autoComplete="off" />
            </div>
            <div className={styles.emailContainer}>
                <TextField type="email" size="small" fullWidth label="Email" variant="outlined" value={email} id="email" onChange={(e) => onInputChange(e)} autoComplete="off" />
            </div>
            <div className={styles.container}>
                <TextField type="password" className={styles.inputs} size="small" label="Password" variant="outlined" value={password} id="password" onChange={(e) => onInputChange(e)} />
                <TextField type="password" className={styles.inputs} size="small" label="Confirm" variant="outlined" value={rePassword} id="rePassword" onChange={(e) => onInputChange(e)} />
            </div>
            <Link to="signin">Sign in instead</Link>
            <div className={styles.button}>
                <Button variant="contained" color="primary"
                    onClick={(e) => createUserWithEmailAndPasswordHandler(e, firstName, lastName, email, password, rePassword)}>
                    sign up
                </Button>
            </div>
        </form>
    );
}
