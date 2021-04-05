import React, { useState } from 'react';
import { Drawer, List, Tooltip } from '@material-ui/core';
import Sidebar from './Sidebar';
import { Home, Whatshot, VideoLibrary, History } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../../assets/logo.png';
import blackLogo from '../../assets/blackLogo.png';
import { useHistory } from "react-router-dom";
import styles from './Sidebar.module.scss';
import { useSelector } from 'react-redux';

export default function SidebarOpen() {
    const history = useHistory();
    const theme = useSelector(state => state.theme.theme);
    const [state, setState] = useState(false);

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const mainLogo = (
        <div className={styles.mainLogoContainer}>
            <MenuIcon onClick={toggleDrawer('left', true)} className={styles.sandwichButton} />
            <Tooltip title="YouTube Home" placement="bottom-end">
                <div className={styles.logo} onClick={() => history.push('/')}>
                    <img className={styles.siteLogo} src={theme === 'dark' ? logo : blackLogo} alt="youtube's logo" />
                    <span className={styles.countryCode}>BG</span>
                </div>
            </Tooltip>
        </div>
    );

    const list = (anchor) => (
        <div
            className={styles.sideOpen}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <div onClick={toggleDrawer(anchor, false)} className={styles.openLogo}>{mainLogo}</div>
                <Sidebar Icon={Home} type={'Home'} />
                <Sidebar Icon={Whatshot} type={'Trending'} />
                <Sidebar Icon={VideoLibrary} type={'Library'} />
                <Sidebar Icon={History} type={'History'} />
            </List>
        </div>
    );

    return (
        <div>
            {mainLogo}
            <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
                {list('left')}
            </Drawer>
        </div>
    );
}