import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import logo from './logo.png';
import styles from './Header.module.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
export default function Header() {
    return (
        <div className={styles.header}>
            <div className={styles.logoContainer}>
                <MenuIcon className={styles.icons} />
                <img src={logo} alt='youtube\s logo' />
            </div>
            <div className={styles.searchContainer}>
                <input type="text"></input>
                <span className={styles.searchCont}><SearchIcon className={styles.searchIcon} /></span>
                <KeyboardVoiceIcon className={styles.icons} />
            </div>
            <div className={styles.userContainer}>
                <VideoCallIcon className={styles.icons} />
                <div className={styles.signIn}>
                    <AccountCircleIcon />
                    <span>Sign in</span>
                </div>
            </div>

        </div>
    )
}