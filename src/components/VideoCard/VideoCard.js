import React from 'react';
import styles from './VideoCard.module.scss';
import HoverVideoPlayer from 'react-hover-video-player';
export default function VideoCard({ url, title, id, author, duration }) {
    return (
        <div className={styles.container} id={id}>
            <HoverVideoPlayer
                videoSrc={url} className={styles.video}
            />
            <div className={styles.duration}>{duration}</div>
            <span className={styles.title}>{title}</span>
            <span className={styles.description}>{author}</span>
        </div>
    );
}