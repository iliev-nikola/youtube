import React, { useEffect, useState } from 'react';
import { Redirect, Route, Router, useHistory, useParams } from "react-router-dom";
import styles from './OpenVideo.module.scss';
import ReactPlayer from 'react-player';
import { auth, db } from '../../firebase';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import LikeOrDislikeVideo from './LikeOrDislikeVideo';
import { Input, Link } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { dislikeIt, likeIt } from '../../redux/actions/videos';
import { getVideos, getUser, getVideoComments } from '../../redux/selectors/selectors';
import VideoCard from '../VideoCard/VideoCard';
import { VideocamSharp } from '@material-ui/icons';
import { getComments } from '../../redux/actions/comments';
import { showUpdatedComments } from '../../redux/actions/comments';


export default function OpenVideo({ sidebar }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [inputValue, setInputValue] = useState('');
    const [user, setUser] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const reduxVideos = useSelector(getVideos);
    const video = reduxVideos.find(video => video.id === id);
    const comments = useSelector(getVideoComments);
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                setUser(user);
            }
        });
    }, [user]);

    useEffect(() => {
        dispatch(getComments(id));
    }, [id, dispatch]);

    const onInputChange = (e) => {
        setInputValue(e.currentTarget.value);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && inputValue) {
            // if (video.comments) {
            //     video.comments.unshift({ comment: inputValue, user: user.displayName, photoURL: user.photoURL, userId: user.uid });
            // }
            dispatch(showUpdatedComments(id, user, inputValue));
            // const commentData = {
            //     videoID: id,
            //     comment: inputValue,
            //     userID: user.uid,
            //     displayName: user.displayName,

            // }
            // db.collection('comments').doc().set(commentData);
            setInputValue('');
        }
    }
    const numberLikes = (
        <><ThumbUp className={isLiked ? styles.liked : styles.button} onClick={() => { dispatch(likeIt(video, id)) }} /><span>{video ? video.isLikedBy.length : null}</span></>
    );
    const loggedNumberLikes = (
        <><LikeOrDislikeVideo button={<ThumbUp className={styles.button} />} content={'Like this video?'} /><span>{video ? video.isLikedBy.length : null}</span></>
    );
    const numberDislikes = (
        <><ThumbDownIcon className={isDisliked ? styles.disliked : styles.button} onClick={() => { dispatch(dislikeIt(video, id)) }} /><span>{video ? video.isDislikedBy.length : null}</span></>
    );
    const loggedNumberDIslikes = (
        <><LikeOrDislikeVideo button={<ThumbDownIcon className={styles.button} />} content={`Don't like this video?`} /><span>{video ? video.isDislikedBy.length : null}</span></>
    );


    return (
        <div className={sidebar ? styles.notActive : styles.mainContainer}>
            <div>
                {video ?
                    <div>
                        <ReactPlayer url={video.url} controls playing={true} className={styles.video} />
                        <div className={styles.hashtags}>
                            {`#${video.title} #video# ${video.views} #youtube`}
                        </div>
                        <div className={styles.infoContainer}>
                            <p className={styles.title}>{video.title}</p>
                            <div className={styles.likesContainer}>
                                <div className={styles.views}>{video.views} views</div>
                                <div className={styles.thumbs}>
                                    {user ? <>{numberLikes}</> : <>{loggedNumberLikes}</>}
                                    {user ? <>{numberDislikes}</> : <>{loggedNumberDIslikes}</>}
                                </div>
                            </div>
                        </div>
                        <div className={styles.videoInfo}>
                            <a className={styles.userLogo} href={`/user/${video.authorID}`}>{video.author[0]}</a>
                            <span className={styles.descr}>{video.description}</span>
                        </div>
                        <div>
                            <div className={styles.commentsContainer}>
                                <div onClick={() => !user ? history.push('/signin') : null}>
                                    < Input placeholder='Add a public comment...' className={styles.input} onChange={onInputChange} onKeyPress={handleKeyPress} value={inputValue} />
                                </div>
                                {comments ?
                                    comments.map((currentComment, index) => (
                                        <div key={index} className={styles.mainComm} >
                                            <div className={styles.userLogo} onClick={() => history.push(`/user/${currentComment.userID}`)}>
                                                {currentComment.photoURL ? <img className={styles.userPic} src={currentComment.photoURL} alt='user logo' /> : <h1>{currentComment.displayName}</h1>}</div>
                                            <div className={styles.commentsContainer}>
                                                <div className={styles.someComment}>
                                                    <p className={styles.userName}>{currentComment.displayName}</p>
                                                    <p className={styles.comment}>{currentComment.comment}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                    : <div className={styles.addFirstComment}>Add your first comment...</div>}
                            </div>
                        </div>
                    </div> : null}
            </div>
            {/* <div className={styles.otherVideos}>
                {reduxVideos.map(video => (
                    <Link to={`/video/${video.id}`} className='link' key={video.id}>
                        <div>
                            <VideoCard url={video.url} title={video.title} duration={video.duration} views={video.views} />
                        </div>
                    </Link>
                ))}
            </div> */}
        </div>
    );
}