import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import styles from './SignIn.module.css';
import { auth, getUserDocument } from '../../firebase';
import { Link, useHistory } from "react-router-dom"
import { getCurrentUser, setCurrentUser, validateEmail } from '../../utils'


export default function SignIn() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [error, setError] = useState(null);

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

        auth.signInWithEmailAndPassword(email, password)
            .then((res) => {
                // getUserDocument(getCurrentUser().uid);
                setEmail('');
                setPassword('');
                setCurrentUser();
                history.push('/');
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
            <div className={styles.emailContainer}>
                <TextField type="email" size="small" fullWidth label="Email" variant="outlined" value={email} id="email" onChange={(e) => onInputChange(e)} autoComplete="off" />
            </div>
            <div className={styles.container}>
                <TextField type="password" className={styles.inputs} size="small" label="Password" variant="outlined" value={password} id="password" onChange={(e) => onInputChange(e)} />
            </div>
            <Link to="signup">Create account</Link>
            <div className={styles.button}>
                <Button variant="contained" color="primary"
                    onClick={(e) => signInWithEmailAndPasswordHandler(e, email, password)}>
                    sign in
                </Button>
            </div>
        </form>
    );
}
