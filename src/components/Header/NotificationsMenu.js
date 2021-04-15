import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import ReactTimeAgo from 'react-time-ago';
// service
import { deleteNotification, setNotificationsRead } from '../../service/service';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../redux/selectors/user';
// components
import { Tooltip, Badge, ClickAwayListener } from '@material-ui/core';
import { Notifications as NotificationsIcon, Cancel } from '@material-ui/icons';
import UserLogo from '../common/UserLogo/UserLogo';
import { db } from '../../service/firebase';

export default function NotificationsMenu() {
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    // const notifications = useSelector(state => state.notification.notifications);
    const [openNotify, setOpenNotify] = useState(false);
    const [unreadNotifications, setUnreadNotifications] = useState([]);
    const [notifications, setNotifciatons] = useState([]);
    const handleClickNotify = () => {
        setOpenNotify((prev) => !prev);
        setTimeout(setNotificationsRead, 2000);
    };
    const handleClickAwayNotify = () => {
        setOpenNotify(false);
    };
    useEffect(() => {
        if (user) {
            db.collection('notifications')
                .where('userID', '==', user.uid)
                .orderBy('timestamp', 'desc')
                .onSnapshot((notifications) => {
                    let dbNot = [];
                    notifications.forEach((noti) => {
                        dbNot.push(noti.data());
                    });
                    setNotifciatons(dbNot);
                });
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            setUnreadNotifications(notifications.filter(notification => !notification.isRead));
        }
    }, [user, dispatch, notifications]);

    const noNotifications = (
        <><NotificationsIcon fontSize="large" id={styles.bigNotifyIcon} />
            <p className={styles.greyText}>No new notifications.</p></>
    );
    return (
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
    )
}