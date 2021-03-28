import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import styles from './OpenVideo.module.scss';
import { getVideo } from "../../service";
import ReactPlayer from 'react-player';
import { auth } from '../../firebase';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import LikeOrDislikeVideo from './LikeOrDislikeVideo';
import { Input } from '@material-ui/core'
import { getAllVideos } from '../../service';
import VideoCard from '../VideoCard/VideoCard';

export default function OpenVideo({ slidebar, slideBarContainer }) {
    const history = useHistory();
    const { id } = useParams();
    const [video, setVideo] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [user, setUser] = useState(null);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        getAllVideos().then((result) => setVideos(result));
    }, []);
    // const [likes, setLikes] = useState(0);
    // const [dislikes, setDislikes] = useState(0);
    // const [isLiked, setIsLiked] = useState(false);
    // const [isDisliked, setIsDisliked] = useState(false);
    const onInputChange = (e) => {
        setInputValue(e.currentTarget.value);
    }

    // const liked = () => {
    //     setLikes(1);
    //     setDislikes(0);
    //     setIsLiked(true);
    //     setIsDisliked(false);
    // }

    // const disliked = () => {
    //     setDislikes(1);
    //     setLikes(0);
    //     setIsLiked(false);
    //     setIsDisliked(true);
    // }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && inputValue) {
            if (video.comments) {
                video.comments.unshift({ comment: inputValue, user: user.displayName });
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
        <div>
            <div className={slidebar ? 'open' : 'close'}>
                {slideBarContainer}
            </div>
            <div className={slidebar ? styles.notActive : styles.mainContainer}>
                <div>
                    <div><ReactPlayer url={video.url} controls playing={true} className={styles.video} />
                        <div className={styles.likesContainer}>
                            <div className={styles.hashtags}>
                                {`#${video.title}#video#${video.artist}#youtube`}
                            </div>
                            <div className={styles.thumbs}>
                                {user ? <ThumbUp className={styles.button} /> : <LikeOrDislikeVideo button={<ThumbUp className={styles.button} />} content={'Like this video?'} />}
                                {user ? <ThumbDownIcon className={styles.button} /> : <LikeOrDislikeVideo button={<ThumbDownIcon className={styles.button} />} content={`Don't like this video?`} />}
                            </div>
                        </div>
                        <p className={styles.info}>{video.artist} - {video.title}</p>
                        <a href={`/user/${video.authorId}`}>{video.author}</a>
                        <div>
                            <div className={styles.commentsContainer}>
                                <div onClick={() => !user ? history.push('/signin') : null}>
                                    < Input placeholder='Добавяне на публичен коментар...' className={styles.input} onChange={onInputChange} onKeyPress={handleKeyPress} />
                                </div>
                                {video.comments ?
                                    video.comments.map((currentComment, index) => (
                                        <div key={index} className={styles.mainComm} >
                                            <div className={styles.userLogo}>{currentComment.user[0]}</div>
                                            <div className={styles.commentsContainer}>
                                                <div className={styles.someComment}>
                                                    <p className={styles.userName}>{currentComment.user}</p>
                                                    <p className={styles.comment}>{currentComment.comment}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                    : <div className={styles.addFirstComment}>Add your first comment...</div>}
                            </div>

                        </div>
                    </div>
                </div>
                <div>
                    {videos.map(video => (
                        <a href={`/video/${video.id}`} className='link' key={video.id}>
                            <div>
                                <VideoCard url={video.url} title={video.title} author={video.artist} duration={video.duration} />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}