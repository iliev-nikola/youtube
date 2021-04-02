import React, { useEffect, useState } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { Tooltip } from '@material-ui/core';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { db } from '../../firebase';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import styles from './Header.module.scss';
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from '../../theme/theme';
import { getUser } from '../../redux/selectors/user';
import { getVideos } from '../../redux/selectors/videos';

export default function UserMenu() {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const videos = useSelector(getVideos);

    const [openNotify, setOpenNotify] = useState(false);
    const handleClickNotify = () => {
        setOpenNotify((prev) => !prev);
    };
    const handleClickAwayNotify = () => {
        setOpenNotify(false);
    };
    const [openProfile, setOpenProfile] = useState(false);
    const handleClickProfile = () => {
        setOpenProfile((prev) => !prev);
    };
    const handleClickAwayProfile = () => {
        setOpenProfile(false);
    };
   
    return (
        <div id={styles.userIcons}>
            <Tooltip title="Upload a video" placement="bottom">
                <VideoCallIcon fontSize='default' className={styles.icons} onClick={() => history.push('/upload')} />
            </Tooltip>
            <ClickAwayListener
                mouseEvent="onMouseDown"
                touchEvent="onTouchStart"
                onClickAway={handleClickAwayNotify}
            >
                <div className={styles.dropdownContainer} >
                    <Tooltip title="Notifications" placement="bottom">
                        <NotificationsIcon className={styles.icons} onClick={handleClickNotify} />
                    </Tooltip>
                    {openNotify ? (
                        <div id={styles.dropdownNotify} className={styles.dropdown}>
                            <h4 className={styles.notifyTitle}>Notifications</h4>
                            <div className={styles.line}></div>
                            <NotificationsIcon fontSize="large" id={styles.bigNotifyIcon} />
                            <p className={styles.greyText}>No new notifications.</p>
                        </div>
                    ) : null}
                </div>
            </ClickAwayListener>

            <ClickAwayListener
                mouseEvent="onMouseDown"
                touchEvent="onTouchStart"
                onClickAway={handleClickAwayProfile}
            >
                <div className={styles.dropdownContainer} >
                    {user ?
                        <Tooltip title="My profile" placement="bottom">
                            {user.photoURL ?
                                <img className={styles.userPhoto} onClick={handleClickProfile} src={user.photoURL} alt='user logo' />
                                : <h1 onClick={handleClickProfile} className={styles.userIcon}>{user ? user.displayName[0] : null}</h1>}
                        </Tooltip>
                        : null}
                    {openProfile ? (
                        <ul className={styles.dropdown}>
                            {user ?
                                <li className={styles.displayFlex}>
                                    {user.photoURL ?
                                        <img className={styles.userPhoto} src={user.photoURL} alt='user logo' /> :
                                        <h1 className={styles.userIcon}>{user.displayName[0]}</h1>
                                    }
                                    <div className={styles.userInfo}>
                                        <h4 className={styles.marginNone}>{user.displayName}</h4>
                                        <p className={styles.marginNone}>{user.email}</p>
                                    </div>
                                </li> : null
                            }
                            <div className={styles.line}></div>
                            <Link to={`/user/${user.uid}`} className={styles.links}>
                                <li className={styles.listItem}>
                                    <AccountBoxIcon className={styles.iconColorGrey} />
                                    <p className={styles.text}>My channel</p>
                                </li>
                            </Link>
                            <div className={styles.line}></div>
                            <button onClick={() => dispatch(toggleTheme())} >Toggle theme</button>
                            <div className={styles.line}></div>
                            <Link to='/signout' className={styles.links}>
                                <li className={styles.listItem}>
                                    <ExitToAppIcon className={styles.iconColorGrey} />
                                    <p className={styles.text}>Sign out</p>
                                </li>
                            </Link>
                        </ul>
                    ) : null}
                </div>
            </ClickAwayListener>
        </div >
    );
}