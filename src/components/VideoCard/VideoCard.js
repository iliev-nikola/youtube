import React from 'react';
import styles from './VideoCard.module.css';
import logo from './test.svg';

export default function VideoCard() {
    return (
        <div className={styles.container}>
            <div><img src={logo} alt='YouTube logo'></img></div>
            <p className={styles.title}>Title</p>
            <p className={styles.description}>Description</p>
        </div>
    );
}