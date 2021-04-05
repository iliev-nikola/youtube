import React, { useEffect, useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import styles from './Header.module.scss';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Tooltip } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import UserMenu from './UserMenu';
import { useSelector } from 'react-redux';
import { getUser } from '../../redux/selectors/user';
import SidebarOpen from '../Sidebar/SidebarOpen';
import { getVideosByTitle } from '../../service';

export default function Header() {
    const user = useSelector(getUser);
    const history = useHistory();
    const [inputSearchValue, setInputSearchValue] = useState('');
    const [options, setOptions] = useState([]);

    const onInputChange = (e) => {
        const value = e.currentTarget.value;
        setInputSearchValue(value);
        if (value.length) {
            getVideosByTitle(value).then(res => setOptions(res.slice(0, 10)));
        } else {
            setOptions([])
        }
    }

    const onFocus = (e) => {
        getVideosByTitle().then(res => setOptions(res.slice(0, 10)));
    }

    const onFocusOut = (e) => {
        setOptions([]);
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
                    <input onFocus={onFocus} onBlur={onFocusOut} type="text" placeholder="Search" value={inputSearchValue} onChange={onInputChange} onKeyPress={handleKeyPress}></input>
                    <div className={styles.optionsList}>
                        {options.length ? options.map(opt => <a key={opt.id} href={`/video/${opt.id}`}>{opt.title}</a>) : null}
                    </div>
                    <Tooltip title="Search">
                        <span onClick={handleKeyPress} className={styles.searchCont}><SearchIcon className={styles.searchIcon} fontSize="small" /></span>
                    </Tooltip>
                </div>
                <div className={styles.userContainer}>
                    {user ? userHeader : guestHeader}
                </div>
            </div>
        </div>
    )
}
