import React from 'react';
import styles from './VideoCard.module.css';
import ReactPlayer from 'react-player';
export default function VideoCard({ url, title, id, author }) {
    return (
        <div className={styles.container} id={id}>
            <ReactPlayer className={styles.video} url={url} width='275px'
                height='145px' />
            <p className={styles.title}>{title}</p>
            <p className={styles.description}>{author}</p>
        </div>
    );
}