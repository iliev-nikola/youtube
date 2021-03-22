import React from 'react';
import { useParams } from "react-router-dom";
import videos from "../../videos";
import styles from './OpenVideo.module.css';
import ReactPlayer from 'react-player';
import { Input } from '@material-ui/core'
import { firestore, allVideos } from '../../firebase';
export default function OpenVideo() {
    const { id } = useParams();

    const currentVideo = videos.find(video => video.id === id);
    // firestore.collection("videos")
    //     .get()
    //     .then((videos) => {
    //         videos.forEach((video) => {
    //             if(video.id===id){
    //             console.log(video.data())
    //             render(
    //                 <div></div>
    //             )

    //             }
    //         })
    //     })
    // console.log([...allVideos],currentVideo);
    return (
        <div className={styles.mainContainer}>
            <div>
                <div><ReactPlayer url={currentVideo.url} controls playing={true} className={styles.video} />
                    <p className={styles.info}>{currentVideo.author} - {currentVideo.title}</p>
                    <div>
                        <div className={styles.commentsContainer}>
                            <div>
                                <Input placeholder='Добавяне на публичен коментар...' className={styles.input} />
                            </div>
                            {currentVideo.comments ?

                                currentVideo.comments.map(currentComment => (
                                    <div key = { currentComment.user } className = { styles.mainComm } >
                                        <div className={styles.userLogo}>{currentComment.user[0]}</div>
                                        <div className={styles.someComment}>
                                            <p className={styles.userName}>{currentComment.user}</p>
                                            <p className={styles.comment}>{currentComment.comment}</p>
                                        </div>
                                    </div>
                                ))
                                : <div className={styles.addFirstComment}>Добави първия коментар...</div>}
                        </div>
                </div>
            </div>
        </div>
        </div >
    );
}