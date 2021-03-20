import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import logo from './logo.png';
import styles from './Header.module.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Tooltip } from '@material-ui/core';
import { Link } from "react-router-dom";
export default function Header({ handleToggerSlidebar, slidebar }) {
    return (
        <div className={styles.header}>
            <div className={slidebar ? styles.newLogoContainer : styles.logoContainer}>
                <MenuIcon className={styles.icons} onClick={() => handleToggerSlidebar()} />
                <Tooltip title="YouTube Home" placement="bottom-end">
                    <div className={styles.logo}>
                        <img src={logo} alt='youtube\s logo' />
                        <span>YouTube</span>
                    </div>
                </Tooltip>
            </div>
            <div className={styles.searchContainer}>
                <input type="text"></input>
                <Tooltip title="Search">
                    <span className={styles.searchCont}><SearchIcon className={styles.searchIcon} /></span>
                </Tooltip>
                <Tooltip title="Search with your voice">
                    <KeyboardVoiceIcon className={styles.icons, styles.voice} />
                </Tooltip>
            </div>
            <div className={styles.userContainer}>
                <VideoCallIcon className={styles.icons} />
                <Link to="/signup" className={styles.link} title='signup'>
                    <div className={styles.signIn}>
                        <AccountCircleIcon />
                        <span>SIGN IN</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}