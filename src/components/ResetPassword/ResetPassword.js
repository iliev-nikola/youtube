import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import styles from './ResetPassword.module.css';
import { auth } from '../../firebase';
import { Link } from "react-router-dom"
import logo from '../../assets/logo.png'

export default function ResetPassword() {
    const [email, setEmail] = useState('');
    const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
    const sendResetEmail = event => {
        event.preventDefault();
        auth
            .sendPasswordResetEmail(email)
            .then(() => {
                setEmailHasBeenSent(true);
                setTimeout(() => { setEmailHasBeenSent(false) }, 3000);
            })
            .catch(err => alert(err));
    };

    const onInputChange = (e) => {
        e.preventDefault();
        const { value } = e.currentTarget;
        setEmail(value);
    };

    return (
        <form className={styles.signUp}>
            <img src={logo} alt="logo" id={styles.logo} />
            <h2 className={styles.welcomeText}>Reset your password</h2>
            <p className={styles.welcomeText}>to continue to YouTube</p>
            {emailHasBeenSent && (
                <div className="py-3 bg-green-400 w-full text-white text-center mb-3">
                    An email has been sent to you!
                </div>
            )}
            <div className={styles.container}>
                <TextField type="email" className={styles.inputs} size="medium" fullWidth label="Email" variant="outlined" value={email} id="email" onChange={(e) => onInputChange(e)} autoComplete="off" />
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
    );
}
