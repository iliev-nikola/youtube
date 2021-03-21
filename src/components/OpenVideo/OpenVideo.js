import React from 'react';
import { useParams } from "react-router-dom";
import videos from "../../videos";
import styles from './OpenVideo.module.css';
import ReactPlayer from 'react-player';
import randomComments from '../../randomComments';
import { Input } from '@material-ui/core'
export default function OpenVideo() {
    const { id } = useParams();
    const currentVideo = videos.find(video => video.id === id);
    return (
        <div className={styles.mainContainer}>
            <div>
                <div><ReactPlayer url={currentVideo.url} playing={true} className={styles.video} />
                    <p className={styles.info}>{currentVideo.author} - {currentVideo.title}</p>
                    <div>
                        <div className={styles.commentsContainer}>
                            <div>
                                <Input placeholder='Добавяне на публичен коментар...' className={styles.input} />
                            </div>
                            {
                                randomComments.map(comment => (
                                    <div className={styles.someComment} key={comment.user}>
                                        <p className={styles.userName}>{comment.user}</p>
                                        <p className={styles.comment}>{comment.comment}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div>
                    <div>Recommended videos</div>
                </div>
            </div>
        </div>
    );
}
