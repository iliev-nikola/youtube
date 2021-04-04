import React, { useState } from 'react';
import { timeConvert } from '../../utils';
import styles from './VideoCard.module.scss';
export default function VideoCard({ url, title, id, views }) {
    const [duration, setDuration] = useState(null);
    const onLoad = (e) => {
        setDuration(timeConvert(e.target.duration));
    };
    return (
        <div className={styles.container} id={id}>
            <video
                title={title}
                onMouseOver={(e) => e.target.play()}
                onMouseOut={(e) => e.target.pause()}
                src={url + '#t=1'}
                className={styles.video}
                muted={true}
                onLoadedMetadata={(e) => onLoad(e)}
            />
            <div className={styles.duration}>{duration}</div>
            <p className={styles.title}>{title}</p>
            <p className={styles.views}>{views} views</p>
        </div>
    );
}