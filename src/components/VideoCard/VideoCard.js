import React, { useState } from 'react';
import { timeConvert } from '../../utils';
import styles from './VideoCard.module.scss';
import UserLogo from '../common/UserLogo/UserLogo';
export default function VideoCard({ url, title, id, views, author, authorPhotoURL }) {
    const [duration, setDuration] = useState(null);

    const onLoad = (e) => {
        setDuration(timeConvert(e.target.duration));
    };
    return (
        <a href={`/video/${id}`} className={styles.link}>
            <div className={styles.container} key={id}>
                <video
                    title={title}
                    onMouseOver={(e) => e.target.play()}
                    onMouseOut={(e) => e.target.pause()}
                    src={url + '#t=1'}
                    datatype='video/mp4'
                    className={styles.video}
                    muted={true}
                    onLoadedMetadata={(e) => onLoad(e)}
                />
                <div className={styles.duration}>{duration}</div>
                <div className={styles.videoInfoContainer}>
                    <UserLogo author={author} authorPhotoURL={authorPhotoURL} />
                    <div className={styles.videoInfo}>
                        <p className={styles.title}>{title}</p>
                        <p className={styles.authorName}>{author}</p>
                        <p className={styles.views}>{views} views</p>
                    </div>
                </div>
            </div>
        </a>
    );
}