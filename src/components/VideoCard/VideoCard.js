import React from 'react';
import styles from './VideoCard.module.scss';
import HoverVideoPlayer from 'react-hover-video-player';
export default function VideoCard({ url, title, id, duration, views }) {
    return (
        <div className={styles.container} id={id}>
            <HoverVideoPlayer
                videoSrc={url} className={styles.video}
            />
            <div className={styles.duration}>{duration}</div>
            <p className={styles.title}>{title}</p>
            <p className={styles.views}>{views} views</p>
        </div>
    );
}