import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { Tooltip } from '@material-ui/core';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import styles from './Header.module.css';
import { getCurrentUser } from '../../utils';
import { Link, useHistory } from "react-router-dom";


export default function LeadingClickAway() {
    const history = useHistory();
    const [openNotify, setOpenNotify] = React.useState(false);
    const handleClickNotify = () => {
        setOpenNotify((prev) => !prev);
    };
    const handleClickAwayNotify = () => {
        setOpenNotify(false);
    };
    const [openProfile, setOpenProfile] = React.useState(false);
    const handleClickProfile = () => {
        setOpenProfile((prev) => !prev);
    };
    const handleClickAwayProfile = () => {
        setOpenProfile(false);
    };

    return (
        <div id={styles.userIcons}>
            <Tooltip title="Upload a video" placement="bottom">
                <VideoCallIcon className={styles.icons} onClick={() => history.push('/upload')} />
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
                            <NotificationsIcon />
                            No new notifications.
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
                    <Tooltip title="My profile" placement="bottom">
                        <h1 onClick={handleClickProfile} id={styles.userIcon}>{getCurrentUser().names[0]}</h1>
                    </Tooltip>
                    {openProfile ? (
                        <div id={styles.dropdownProfile} className={styles.dropdown}>
                            Profile.
                        </div>
                    ) : null}
                </div>
            </ClickAwayListener>
        </div>
    );
}