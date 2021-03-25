import React, { useEffect, useState } from 'react';
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import styles from './OpenVideo.module.scss';
import { getVideo } from "../../videos";
import ReactPlayer from 'react-player';
import { Input } from '@material-ui/core'
import { auth } from '../../firebase';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import LikeOrDislikeVideo from './LikeOrDislikeVideo';
export default function OpenVideo() {
    const history = useHistory();
    const { id } = useParams();
    const [video, setVideo] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [user, setUser] = useState(null);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);

    const liked = () => {
        setLikes(likes + 1);
    }

    const disliked = () => {
        setDislikes(dislikes + 1);
    }

    const onInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && inputValue) {
            if (video.comments) {
                video.comments.unshift({ comment: inputValue, user: user.displayName });
            } else {

            }
            setInputValue('');
        }
    }

    useEffect(() => {
        getVideo(id).then(res => setVideo(res));
    }, [id]);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                setUser(user);
            }
        });
    }, [user]);

    return (
        <div className={styles.mainContainer}>
            <div>
                <div><ReactPlayer url={video.url} controls playing={true} className={styles.video} />
                    <div className={styles.likesContainer}>
                        <div>{user ? <ThumbUp /> : <LikeOrDislikeVideo button={<ThumbUp />} content={'Like this video?'} />}</div>
                        <div>{user ? <ThumbDownIcon /> : <LikeOrDislikeVideo button={<ThumbDownIcon />} content={`Don't like this video?`} />}</div>
                    </div>
                    <p className={styles.info}>{video.author} - {video.title}</p>
                    <div>
                        <div className={styles.commentsContainer}>
                            <div onClick={() => !user ? history.push('/signin') : null}>
                                < Input placeholder='Добавяне на публичен коментар...' className={styles.input} onChange={onInputChange} onKeyPress={handleKeyPress} />
                            </div>
                            {video.comments ?

                                video.comments.map((currentComment, index) => (
                                    <div key={index} className={styles.mainComm} >
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