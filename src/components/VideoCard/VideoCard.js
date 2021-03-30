import React from 'react';
import styles from './VideoCard.module.scss';
export default function VideoCard({ url, title, id, duration, views }) {
    return (
        <div className={styles.container} id={id}>
            <video
                title={title}
                onMouseOver={(e) => e.target.play()}
                onMouseOut={(e) => e.target.pause()}
                src={url + '#t=1'}
                className={styles.video}
                muted={true}
            />
            <div className={styles.duration}>{duration}</div>
            <p className={styles.title}>{title}</p>
            <p className={styles.views}>{views} views</p>
        </div>
    );
}