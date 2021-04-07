import React, { useState, useEffect, version } from 'react';
import { Tooltip, Badge, ClickAwayListener } from '@material-ui/core';
import { VideoCall as VideoCallIcon, Notifications as NotificationsIcon, ExitToApp as ExitToAppIcon, AccountBox as AccountBoxIcon, Cancel, InvertColors as InvertColorsIcon, SettingsInputAntenna } from '@material-ui/icons';
import styles from './Header.module.scss';
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from '../../redux/selectors/user';
import { getNotifications } from '../../redux/actions/notifications';
import { deleteNotification, setNotificationsRead, updateUserTheme } from '../../service';
import UserLogo from '../common/UserLogo/UserLogo';
import ReactTimeAgo from 'react-time-ago';
import { setDarkTheme, setLightTheme } from '../../redux/actions/theme';

export default function UserMenu() {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const notifications = useSelector(state => state.notification.notifications);
    const [openNotify, setOpenNotify] = useState(false);
    const [unreadNotifications, setUnreadNotifications] = useState([]);
    const theme = useSelector(state => state.theme.theme);
    const handleClickNotify = () => {
        setOpenNotify((prev) => !prev);
        setTimeout(setNotificationsRead, 2000);
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

    useEffect(() => {
        if (user.uid) {
            dispatch(getNotifications(user.uid));
        }
    }, [user.uid]);

    useEffect(() => {
        if (user.uid) {
            setUnreadNotifications(notifications.filter(notification => !notification.isRead));
        }
    }, [user.uid, dispatch, notifications]);
    // version
    const changeTheme = () => {
        if (user.uid) {
            if (theme === 'dark') {
                updateUserTheme(user, 'light');
            } else {
                updateUserTheme(user, 'dark');
            }
        } else {
            if (theme === 'dark') {
                dispatch(setLightTheme());
            } else {
                dispatch(setDarkTheme());
            }
        }
    }

    const noNotifications = (
        <><NotificationsIcon fontSize="large" id={styles.bigNotifyIcon} />
            <p className={styles.greyText}>No new notifications.</p></>
    );

    return (
        <div id={styles.userIcons}>
            <Tooltip title="Upload a video" placement="bottom">
                <VideoCallIcon fontSize='default' className={styles.icons} onClick={() => history.push('/upload')} />
            </Tooltip>
            <Tooltip title="Change site colors" placement="bottom">
                <InvertColorsIcon className={styles.icons} onClick={changeTheme} />
            </Tooltip>
            <ClickAwayListener
                mouseEvent="onMouseDown"
                touchEvent="onTouchStart"
                onClickAway={handleClickAwayNotify}
            >
                <div className={styles.dropdownContainer} >
                    <Tooltip title="Notifications" placement="bottom">
                        <Badge className={styles.badge} badgeContent={unreadNotifications.length} color="error">
                            <NotificationsIcon className={styles.icons} onClick={handleClickNotify} />
                        </Badge>
                    </Tooltip>
                    {openNotify ? (
                        <div id={styles.dropdownNotify} className={styles.dropdown}>
                            <h4 className={styles.notifyTitle}>Notifications</h4>
                            <div className={styles.line}></div>
                            <div className={styles.greyText}>
                                {notifications.length ? notifications.map((notification, index) => (
                                    <div key={index} className={!notification.isRead ? styles.unread : styles.read}>
                                        <UserLogo author={notification.displayName} authorPhotoURL={notification.photoURL} />
                                        <span className={styles.info}>{`${notification.displayName} ${notification.status} your video `}
                                            <Link to={`/video/${notification.videoID}`}>{notification.videoTitle}</Link></span>
                                        <ReactTimeAgo date={notification.timestamp.toDate()} locale="en-US" />
                                        <Cancel className={styles.cancel} onClick={() => deleteNotification(notification.notID)} />
                                    </div>
                                )) : <div>{noNotifications}</div>}
                            </div>
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
                                : <h1 onClick={handleClickProfile} className={styles.userIcon}>{user.displayName ? user.displayName[0] : null}</h1>}
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