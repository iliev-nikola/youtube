import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import styles from './SignIn.module.scss';
import { auth } from '../../firebase';
import { Link, useHistory } from "react-router-dom";
import { setCurrentUser, validateEmail, login } from '../../utils';
import logo from '../../assets/logo.png';
import firebase from "firebase/app";
import {
    fade,
    ThemeProvider,
    withStyles,
    makeStyles,
    createMuiTheme,
} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { green } from '@material-ui/core/colors';

export default function SignIn() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const useStyles = makeStyles((theme) => ({
    //     root: {
    //         display: 'flex',
    //         flexWrap: 'wrap',
    //     },
    //     margin: {
    //         margin: theme.spacing(1),
    //     },
    //     multilineColor: {
    //         color: 'white'
    //     },
    //     asd: {
    //         color: 'red'
    //     }
    // }));
    // const CssTextField = withStyles({
    //     root: {
    //         '& label.Mui-focused': {
    //             color: 'white',
    //         },
    //         '& .MuiInput-underline:after': {
    //             borderBottomColor: 'white',
    //             color: 'white',
    //         },
    //         '& .MuiOutlinedInput-root': {
    //             '& fieldset': {
    //                 borderColor: 'white',
    //                 color: 'white',
    //             },
    //             '&:hover fieldset': {
    //                 borderColor: 'white',
    //                 color: 'white',
    //             },
    //             '&.Mui-focused fieldset': {
    //                 borderColor: 'white',
    //                 color: 'white',
    //             },
    //         },
    //     },
    // })(TextField);

    // const classes = useStyles();

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
            .then(() => {
                setEmail('');
                setPassword('');
                setCurrentUser();
                login();
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
            {/* <CssTextField
                InputProps={{ className: classes.multilineColor }}
                InputLabelProps={{ className: classes.asd }}
                className={classes.margin}
                label="Custom CSS"
                variant="outlined"
                id="custom-css-outlined-input"
            /> */}
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
