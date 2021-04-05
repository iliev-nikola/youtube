import React, { useEffect, useState, Link } from 'react';
import { useHistory, useParams } from "react-router-dom";
import styles from './OpenVideo.module.scss';
import ReactPlayer from 'react-player';
import { ThumbDown as ThumbDownIcon, ThumbUp } from '@material-ui/icons';
import PopUp from './PopupState';
import { Input } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { changeViews, fetchVideo } from '../../redux/actions/videos';
import { getUser, getVideoComments, getVideos } from '../../redux/selectors/selectors';
import { getComments } from '../../redux/actions/comments';
import { setAlertOn } from '../../redux/actions/alertNotifier';
import { getVideo, getVideoURL, getVideoID, getVideoTitle, getVideoViews, getVideoAuthor, getVideoDescription, getVideoLikes, getVideoDislikes, getVideoAuthorID } from '../../redux/selectors/video';
import UserLogo from '../common/UserLogo/UserLogo';
import { updatedNotifications, createComments, dislikeVideo, likeVideo } from '../../service';
import PlaylistModal from '../Playlists/PlaylistModal';
import Header from '../Header/Header';
import ReactTimeAgo from 'react-time-ago';
import VideoCard from '../VideoCard/VideoCard';

export default function OpenVideo() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();
    const videos = useSelector(getVideos);
    const [inputValue, setInputValue] = useState('');
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const comments = useSelector(getVideoComments);
    const user = useSelector(getUser);
    const video = useSelector(getVideo);
    const videoId = useSelector(getVideoID);
    const videoTitle = useSelector(getVideoTitle);
    const videoViews = useSelector(getVideoViews);
    const videoAuthor = useSelector(getVideoAuthor);
    const videoDescription = useSelector(getVideoDescription);
    const videoURL = useSelector(getVideoURL);
    const videoDislikes = useSelector(getVideoDislikes);
    const videoLikes = useSelector(getVideoLikes);
    const authorID = useSelector(getVideoAuthorID);

    useEffect(() => {
        if (user && videoId) {
            setIsLiked(videoLikes.some(userID => userID === user.uid));
            setIsDisliked(videoDislikes.some(userID => userID === user.uid));
        }
    }, [videoDislikes, videoLikes, user, videoId])

    useEffect(() => {
        dispatch(getComments(id));
    }, [id, dispatch]);

    useEffect(() => {
        dispatch(fetchVideo(id));
    }, []);

    useEffect(() => {
        if (videoId) {
            dispatch(changeViews());
        }
    }, [videoId]);

    const onInputChange = (e) => {
        const value = e.currentTarget.value;
        if (value.length > 100) {
            return dispatch(setAlertOn('error', 'Comment should not exceed 100 characters!'));
        }

        setInputValue(value);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && inputValue) {
            createComments(id, user, inputValue);
            updatedNotifications(video, user, 'comment');
            setInputValue('');
        }
    }
    const likeIt = () => {
        likeVideo(user, video);
        updatedNotifications(video, user, 'like');
        setIsLiked(videoLikes.some(userID => userID === user.uid));
        setIsDisliked(videoDislikes.some(userID => userID === user.uid));
    }
    const dislikeIt = () => {
        dislikeVideo(user, video);
        updatedNotifications(video, user, 'dislike');
        setIsLiked(videoLikes.some(userID => userID === user.uid));
        setIsDisliked(videoDislikes.some(userID => userID === user.uid));
    }
    const text = 'Sign in to make your opinion count.';
    const numberLikes = (
        <><ThumbUp className={isLiked ? styles.liked : styles.button} onClick={() => { likeIt() }} /><span>{videoId ? videoLikes.length : null}</span></>
    );
    const loggedNumberLikes = (
        <><PopUp text={text} button={<ThumbUp className={styles.button} />} content={'Like this video?'} /><span>{videoId ? videoLikes.length : null}</span></>
    );
    const numberDislikes = (
        <><ThumbDownIcon className={isDisliked ? styles.disliked : styles.button} onClick={() => { dislikeIt() }} /><span>{videoId ? videoDislikes.length : null}</span></>
    );
    const loggedNumberDIslikes = (
        <><PopUp text={text} button={<ThumbDownIcon className={styles.button} />} content={`Don't like this video?`} /><span>{videoId ? videoDislikes.length : null}</span></>
    );

    return (
        <>
            <Header />
            <div className={styles.videoContainer}>
                {videoId ?
                    <div className={styles.container}>
                        <ReactPlayer url={videoURL} controls playing={true} className={styles.video} />
                        <div className={styles.hashtags}>
                            {`#${videoTitle} #video #${videoViews} #youtube`}
                        </div>
                        <div className={styles.infoContainer}>
                            <p className={styles.title}>{videoTitle}</p>
                            <div className={styles.likesContainer}>
                                <div className={styles.views}>{videoViews} views</div>
                                <div className={styles.thumbs}>
                                    {user ? <>{numberLikes}</> : <>{loggedNumberLikes}</>}
                                    {user ? <>{numberDislikes}</> : <>{loggedNumberDIslikes}</>}
                                    {video ? <PlaylistModal video={video} /> : null}
                                </div>
                            </div>
                        </div>
                        <div className={styles.videoInfo}>
                            <UserLogo author={video.author} authorPhotoURL={video.authorPhotoURL} />
                            <span className={styles.descr}>{videoDescription}</span>
                        </div>
                        <div>
                            <div className={styles.commentsContainer}>
                                <div onClick={() => !user ? history.push('/signin') : null}>
                                    < Input placeholder='Add a public comment...' className={styles.input} onChange={onInputChange} onKeyPress={handleKeyPress} value={inputValue} />
                                </div>
                                {comments ?
                                    comments.map((currentComment, index) => (
                                        <div key={index} className={styles.mainComm} >
                                            <div onClick={() => history.push(`/user/${currentComment.userID}`)}>
                                                <UserLogo author={currentComment.displayName} authorPhotoURL={currentComment.photoURL} />
                                            </div>
                                            <div className={styles.commentsContainer}>
                                                <div className={styles.someComment}>
                                                    <div className={styles.timeContainer}>
                                                        <p className={styles.userName}>{currentComment.displayName}</p>
                                                        {currentComment.timestamp ? <ReactTimeAgo className={styles.time} date={currentComment.timestamp.toDate()} locale="en-US" /> : null}
                                                    </div>
                                                    <p className={styles.comment}>{currentComment.comment}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                    : <div className={styles.addFirstComment}>Add your first comment...</div>}
                            </div>
                        </div>
                    </div> : null}
                <div className={styles.otherVideos}>
                    <h2>Play next</h2>
                    {videos.length ? videos.map(video => (
                        <VideoCard key={video.id + Math.random()} url={video.url} title={video.title} views={video.views} id={video.id} author={video.author} authorPhotoURL={video.authorPhotoURL} />
                    )) : <h2>No videos to play next...</h2>}
                </div>
            </div>
        </>
    );
}