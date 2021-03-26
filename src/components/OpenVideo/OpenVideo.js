import React, { useEffect, useState } from 'react';
import { Redirect, Route, Router, useHistory, useParams } from "react-router-dom";
import styles from './OpenVideo.module.scss';
import { getVideo } from "../../service";
import ReactPlayer from 'react-player';
import { Input, Link } from '@material-ui/core'
export default function OpenVideo() {
    const { id } = useParams();
    const history = useHistory();
    const [video, setVideo] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const onInputChange = (e) => {
        setInputValue(e.currentTarget.value);
    }

    useEffect(() => {
        getVideo(id).then(res => setVideo(res));
    }, [id]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && inputValue) {
            video.comments.unshift({ comment: inputValue, user: Math.random() });
            setInputValue('');
        }
    }

    return (
        <div className={styles.mainContainer}>
            <div>
                <div><ReactPlayer url={video.url} controls playing={true} className={styles.video} />
                    <p className={styles.info}>{video.artist} - {video.title}</p>
                    <a href={`/user/${video.authorId}`}>{video.author}</a>
                    <div>
                        <div className={styles.commentsContainer}>
                            <div>
                                <Input placeholder='Add a public comment' className={styles.input} onKeyPress={handleKeyPress} onChange={onInputChange} value={inputValue} />
                            </div>
                            {video.comments ?
                                video.comments.map(currentComment => (
                                    <div key={currentComment.user} className={styles.mainComm} >
                                        <div className={styles.someComment}>
                                            <p className={styles.userName}>{currentComment.user}</p>
                                            <p className={styles.comment}>{currentComment.comment}</p>
                                        </div>
                                    </div>
                                ))
                                : <div className={styles.addFirstComment}>Add your first comment...</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}