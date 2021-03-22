import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import styles from './SignIn.module.css';
import { auth } from '../../firebase';
import { Link, useHistory } from "react-router-dom";
import { setCurrentUser, validateEmail, login } from '../../utils';
import logo from '../../assets/logo.png';
import firebase from "firebase/app";

export default function SignIn() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signInWithEmailAndPasswordHandler = (event, email, password) => {
        event.preventDefault();
        [email, password] = [email.trim(), password.trim()];
        if (!email) {
            return alert('Enter an email');
        } else if (!validateEmail(email)) {
            return alert('Enter a valid email');
        } else if (!password) {
            return alert('Enter a password');
        }

        auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
                return auth.signInWithEmailAndPassword(email, password)
                    .then(() => {
                        setEmail('');
                        setPassword('');
                        setCurrentUser();
                        login();
                        history.push('/');
                    })
                    .catch(err => alert(err));
            })
            .catch(err => alert(err));
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

    return (
        <form className={styles.signUp}>
            <img src={logo} alt="logo" id={styles.logo} onClick={() => history.push('/')} />
            <h2 className={styles.welcomeText}>Sign in</h2>
            <p className={styles.welcomeText}>to continue to YouTube</p>
            <div className={styles.container}>
                <TextField type="email" className={styles.inputs} size="medium" fullWidth label="Email" variant="outlined" value={email} id="email" onChange={(e) => onInputChange(e)} autoComplete="off" />
            </div>
            <div className={styles.container}>
                <TextField InputProps={{
                    className: styles.inputs
                }} type="password" className={styles.inputs} size="medium" label="Password" variant="outlined" value={password} id="password" onChange={(e) => onInputChange(e)} />
            </div>
            <div className={styles.buttons}>
                <Link to="signup" className={styles.link}>Create account</Link>
                <div className={styles.button}>
                    <Button variant="contained" color="primary"
                        onClick={(e) => signInWithEmailAndPasswordHandler(e, email, password)}>
                        sign in
                </Button>
                </div>
            </div>
            <Link to="reset" className={styles.link} >Password reset</Link>
        </form>
    );
}
