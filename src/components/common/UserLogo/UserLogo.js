import React from 'react';
import styles from './UserLogo.module.scss';

export default function UserLogo({ author, authorPhotoURL }) {
    return (
        <div>
            {authorPhotoURL && <img className={styles.userPic} src={authorPhotoURL} alt='user logo' />}
            {!authorPhotoURL && <h1 className={styles.userLetter}>{author[0]}</h1>}
        </div>
    )
}