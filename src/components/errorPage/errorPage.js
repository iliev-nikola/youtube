import React from 'react';
import styles from './ErrorPage.module.css';
import SearchIcon from '@material-ui/icons/Search';
import image from './monkey.png';
export default function ErrorPage() {
    return (
        <div className={styles.errorContainer}>
            <img src={image} alt='error'></img>
            <p>This page isn't available. Sorry about that.</p>
            <p>Try searching for something else.</p>
            <div className={styles.searchContainer}>
                <input type="text"></input>
                <span className={styles.searchCont}><SearchIcon className={styles.searchIcon} /></span>
            </div>
        </div>
    )
}