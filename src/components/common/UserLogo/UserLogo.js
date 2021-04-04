import React from 'react';
import styles from './UserLogo.module.scss';

export default function UserLogo({ user }) {
    return (
        <div>
            {user.photoURL && <img className={styles.userPic} src={user.photoURL} alt='user logo' />}
            {!user.photoURL && <h1 className={styles.userPic}> {user.displayName[0]}</h1>}
        </div>
    )
}