import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import logo from '../../assets/logo.png';
import styles from './Header.module.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Tooltip } from '@material-ui/core';
import { Link } from "react-router-dom";
import { isLoggedIn } from '../../utils';

export default function Header({ handleToggerSlidebar, slidebar }) {
    const ref = React.createRef();
    const guestHeader = (
        <Link to="/signin" className={styles.link} title='Sign in'>
            <div className={styles.signIn}>
                <AccountCircleIcon />
                <span>SIGN IN</span>
            </div>
        </Link>)
    const userHeader = (
        <div>
            <VideoCallIcon className={styles.icons} />
            <Link to="/signout">Sign out</Link>
        </div>)
    return (
        <div className={styles.header}>
            <div className={slidebar ? styles.newLogoContainer : styles.logoContainer}>
                <MenuIcon className={styles.icons} onClick={handleToggerSlidebar} />
                <Tooltip title="YouTube Home" placement="bottom-end">
                    {/* <Link to="/" ref={ref}> */}
                    <div className={styles.logo}>
                        <img src={logo} alt='youtube\s logo' />
                    </div>
                    {/* </Link> */}
                </Tooltip>
            </div>
            <div className={styles.searchContainer}>
                <input type="text"></input>
                <Tooltip title="Search">
                    <span className={styles.searchCont}><SearchIcon className={styles.searchIcon} /></span>
                </Tooltip>
                <Tooltip title="Search with your voice">
                    <KeyboardVoiceIcon className={styles.icons + styles.voice} />
                </Tooltip>
            </div>
            <div className={styles.userContainer}>
                {isLoggedIn() ? userHeader : guestHeader}
            </div>
        </div>
    )
}