import React, { useState, useEffect } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import logo from '../../assets/logo.png';
import styles from './Header.module.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Tooltip } from '@material-ui/core';
import { Link, Redirect, useHistory } from "react-router-dom";
import { isLoggedIn } from '../../utils';
import User from './User';
import { auth } from '../../firebase';

export default function Header({ handleToggerSlidebar, slidebar }) {
    // const ref = React.createRef();
    const history = useHistory();

    const guestHeader = (
        // it was a Link here, instead of <a>. Maybe it reload whole page when going to signin page
        <a href='/signin' className={styles.links} title='Sign in'>
            <div className={styles.signIn}>
                <AccountCircleIcon />
                <span>SIGN IN</span>
            </div>
        </a>)
    const userHeader = (
        <div id={styles.userIcons}>
            <User />
        </div>)
    return (
        <div className={styles.header}>
            <div className={slidebar ? styles.newLogoContainer : styles.logoContainer}>
                <MenuIcon className={styles.icons} onClick={handleToggerSlidebar} />
                <Tooltip title="YouTube Home" placement="bottom-end">
                    {/* <Link to="/" ref={ref}> */}
                    <div className={styles.logo} onClick={() => history.push('/')}>
                        <img src={logo} alt="youtube's logo" />
                        <span className={styles.countryCode}>BG</span>
                    </div>
                    {/* </Link> */}
                </Tooltip>
            </div>
            <div className={styles.searchContainer}>
                <input type="text" placeholder="Search" ></input>
                <Tooltip title="Search">
                    <span className={styles.searchCont}><SearchIcon className={styles.searchIcon} fontSize="small" /></span>
                </Tooltip>
                <Tooltip title="Search with your voice">
                    <KeyboardVoiceIcon className={styles.icons} id={styles.voiceIcon} />
                </Tooltip>
            </div>
            <div className={styles.userContainer}>
                {isLoggedIn() ? userHeader : guestHeader}
            </div>
        </div>
    )
}