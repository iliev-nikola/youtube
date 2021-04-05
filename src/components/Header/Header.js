import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import styles from './Header.module.scss';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Tooltip } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import UserMenu from './UserMenu';
import { useSelector } from 'react-redux';
import { getUser } from '../../redux/selectors/user';
import SidebarOpen from '../Sidebar/SidebarOpen';

export default function Header() {
    const user = useSelector(getUser);
    const history = useHistory();
    const [inputSearchValue, setInputSearchValue] = useState('');

    const onInputChange = (e) => {
        setInputSearchValue(e.currentTarget.value);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            let value = inputSearchValue.trim().split(' ').map(el => el.toLowerCase().trim()).join('+');
            history.push('/search/' + value);
        }
    }

    const guestHeader = (
        <a href='/signin' className={styles.links} title='Sign in'>
            <div className={styles.signIn}>
                <AccountCircleIcon />
                <span>SIGN IN</span>
            </div>
        </a>)
    const userHeader = (
        <div id={styles.userIcons}>
            <UserMenu />
        </div>)
    return (
        <div className={styles.headerContainer}>
            <div className={styles.header}>
                <SidebarOpen />
                <div className={styles.searchContainer}>
                    <input type="text" placeholder="Search" value={inputSearchValue} onChange={(e) => onInputChange(e)} onKeyPress={(e) => handleKeyPress(e)}></input>
                    <Tooltip title="Search">
                        <span onClick={(e) => handleKeyPress(e)} className={styles.searchCont}><SearchIcon className={styles.searchIcon} fontSize="small" /></span>
                    </Tooltip>
                </div>
                <div className={styles.userContainer}>
                    {user ? userHeader : guestHeader}
                </div>
            </div>
        </div>
    )
}