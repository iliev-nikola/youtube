import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import styles from './OpenVideo.module.scss';
import { getVideo } from "../../videos";
import ReactPlayer from 'react-player';
import { Input } from '@material-ui/core'
import { db, allVideos } from '../../firebase';
export default function OpenVideo() {
    const { id } = useParams();
    const [video, setVideo] = useState([]);

    useEffect(() => {
        getVideo(id).then(res => setVideo(res));
    }, [id]);

    const [comment, setComment] = useState('');
    // db.collection("videos")
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
    let comments =[];
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' || e.code === 'click') {
            setComment(e.target.value);
            video.comments.push(comment);
            console.log(video.comments);
            e.target.value = '';
        }
    }

    return (
        <div className={styles.mainContainer}>
            <div>
                <div><ReactPlayer url={video.url} controls playing={true} className={styles.video} />
                    <p className={styles.info}>{video.author} - {video.title}</p>
                    <div>
                        <div className={styles.commentsContainer}>
                            <div>
                                <Input placeholder='Добавяне на публичен коментар...' className={styles.input} onKeyPress={handleKeyPress} />
                            </div>
                            {video.comments ?

                                video.comments.map(currentComment => (
                                    <div key={currentComment.user} className={styles.mainComm} >
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