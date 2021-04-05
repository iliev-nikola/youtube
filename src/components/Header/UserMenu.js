import React, { useState, useEffect, createRef } from 'react';
import { Tooltip, Badge, ClickAwayListener } from '@material-ui/core';
import { VideoCall as VideoCallIcon, Notifications as NotificationsIcon, ExitToApp as ExitToAppIcon, AccountBox as AccountBoxIcon, Cancel } from '@material-ui/icons';
import styles from './Header.module.scss';
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from '../../redux/actions/theme';
import { getUser } from '../../redux/selectors/user';
import { getNotifications } from '../../redux/actions/notifications';
import { deleteNotification, setNotificationsRead } from '../../service';
import UserLogo from '../common/UserLogo/UserLogo';
import ReactTimeAgo from 'react-time-ago';

export default function UserMenu() {
    const ref= createRef();
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const notifications = useSelector(state => state.notification.notifications);
    const [openNotify, setOpenNotify] = useState(false);
    const [unreadNotifications, setUnreadNotifications] = useState([]);
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
        dispatch(getNotifications(user.uid));
    }, []);

    useEffect(() => {
        if (user) {
            setUnreadNotifications(notifications.filter(notification => !notification.isRead));
        }
    }, [user, dispatch, notifications]);

    const noNotifications = (
        <><NotificationsIcon fontSize="large" id={styles.bigNotifyIcon} />
            <p className={styles.greyText}>No new notifications.</p></>
    )

    return (
        <div id={styles.userIcons}>
            <Tooltip ref={ref} title="Upload a video" placement="bottom">
                <VideoCallIcon fontSize='default' className={styles.icons} onClick={() => history.push('/upload')} />
            </Tooltip>
            <ClickAwayListener
                mouseEvent="onMouseDown"
                touchEvent="onTouchStart"
                onClickAway={handleClickAwayNotify}
            >
                <div className={styles.dropdownContainer} >
                    <Tooltip title="Notifications" placement="bottom">
                        <Badge badgeContent={unreadNotifications.length} color="error">
                            <NotificationsIcon className={styles.icons} onClick={handleClickNotify} />
                        </Badge>
                    </Tooltip>
                    {openNotify ? (
                        <div id={styles.dropdownNotify} className={styles.dropdown}>
                            <h4 className={styles.notifyTitle}>Notifications</h4>
                            <div className={styles.line}></div>
                            <div className={styles.greyText}>
                                {notifications.length ? notifications.map((notification, index) => (
                                    <div key={index} className={!notification.isRead ? styles.unRead : styles.read}>
                                        <UserLogo user={notification} />
                                        <span className={styles.info}>{`${notification.displayName} ${notification.status} your video `} <Link to={`/video/${notification.videoID}`}>{notification.videoTitle}</Link></span>
                                        {/* <ReactTimeAgo date={notification.timestamp.toDate()} locale="en-US"/> */}
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
                                : <h1 onClick={handleClickProfile} className={styles.userIcon}>{user ? user.displayName[0] : null}</h1>}
                            {/* <UserLogo user={user} className={styles.userIcon} onClick={handleClickProfile} /> */}
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