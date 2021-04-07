import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import styles from './OpenVideo.module.scss';
import ReactPlayer from 'react-player';
import { ThumbDown as ThumbDownIcon, ThumbUp, Edit, Delete } from '@material-ui/icons';
import PopUp from './PopupState';
import { Input, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { changeViews, fetchVideo } from '../../redux/actions/video';
import { getUser, getVideoComments, getVideos } from '../../redux/selectors/selectors';
import { getComments } from '../../redux/actions/comments';
import { setAlertOn } from '../../redux/actions/alertNotifier';
import { getVideo, getVideoURL, getVideoID, getVideoTitle, getVideoViews, getVideoDescription, getVideoLikes, getVideoDislikes } from '../../redux/selectors/video';
import UserLogo from '../common/UserLogo/UserLogo';
import { updatedNotifications, createComments, dislikeVideo, likeVideo, deleteComment, updateComment, editableComment, uneditableComment } from '../../service';
import PlaylistModal from '../LibraryPage/PlaylistModal';
import Header from '../Header/Header';
import ReactTimeAgo from 'react-time-ago';
import VideoCard from '../VideoCard/VideoCard';
<<<<<<< HEAD
import { getVideosLength } from '../../redux/selectors/videos';
import { getUserID } from '../../redux/selectors/user';
=======
>>>>>>> fc3992a59e6fd5164500d2d05fe4e71678f94d94

export default function OpenVideo() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [inputValue, setInputValue] = useState('');
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [editedComment, setEditedComment] = useState('');
    const [visibleVideos, setVisibleVideos] = useState('');
    const videos = useSelector(getVideos);
    const videosLength = useSelector(getVideosLength);
    const comments = useSelector(getVideoComments);
    const user = useSelector(getUser);
    const userID = useSelector(getUserID);
    const video = useSelector(getVideo);
    const videoId = useSelector(getVideoID);
    const videoTitle = useSelector(getVideoTitle);
    const videoViews = useSelector(getVideoViews);
    const videoDescription = useSelector(getVideoDescription);
    const videoURL = useSelector(getVideoURL);
    const videoDislikes = useSelector(getVideoDislikes);
    const videoLikes = useSelector(getVideoLikes);
<<<<<<< HEAD

=======
    const [editedComment, setEditedComment] = useState('');
    console.log(111,videos);
>>>>>>> fc3992a59e6fd5164500d2d05fe4e71678f94d94
    useEffect(() => {
        if (userID && videoId) {
            setIsLiked(videoLikes.some(userID => userID === user.uid));
            setIsDisliked(videoDislikes.some(userID => userID === user.uid));
        }
<<<<<<< HEAD
    }, [videoDislikes, videoLikes, videoId]);

    useEffect(() => {
        if (videosLength) {
            setVisibleVideos(videos);
        }
    }, []);
=======
    }, [videoDislikes, videoLikes, videoId])
>>>>>>> fc3992a59e6fd5164500d2d05fe4e71678f94d94

    useEffect(() => {
        dispatch(getComments(id));
    }, [id]);

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

    const onEditChange = (e) => {
        const value = e.currentTarget.value;
        if (value.length > 100) {
            return dispatch(setAlertOn('error', 'Comment should not exceed 100 characters!'));
        }
        setEditedComment(value);
    }

    const updateIt = (e, id) => {
<<<<<<< HEAD
        if (e.key === 'Enter' && editedComment) {
=======
        if (e.key === 'Enter') {
>>>>>>> fc3992a59e6fd5164500d2d05fe4e71678f94d94
            if (!editedComment) {
                return dispatch(setAlertOn('warning', 'Make some changes first.'));
            }
            updateComment(id, editedComment);
            setEditedComment('');
            dispatch(setAlertOn('success', 'Successfully edited comment.'));
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
                            <UserLogo author={video.author} authorPhotoURL={video.authorPhotoURL} className/>
                                <span className={styles.descr}>{videoDescription}</span>
                        </div>
                        <div>
                            <div className={styles.commentsContainer}>
                                <div className={styles.numberComments}>{comments.length} Comments</div>
                                <div onClick={() => !user ? history.push('/signin') : null}>
                                    < Input placeholder='Add a public comment...' className={styles.input}
                                        onChange={onInputChange} onKeyPress={handleKeyPress} value={inputValue} />
                                </div>
<<<<<<< HEAD
                                {comments.length ?
                                    comments.map(comment => (
                                        <div key={comment.commentID + Math.random()} className={styles.mainComm} >
                                            <a href={`/user/${comment.userID}`} className={styles.link}>
=======
                                {comments ?
                                    comments.map((comment) => (
                                        <div key={comment.commentID} className={styles.mainComm} >

                                            <div  onClick={() => history.push(`/user/${comment.userID}`)}>
>>>>>>> fc3992a59e6fd5164500d2d05fe4e71678f94d94
                                                <UserLogo author={comment.displayName} authorPhotoURL={comment.photoURL} />
                                            </div>
                                            <div className={styles.commentsContainer}>
                                                <div className={styles.someComment}>
                                                    <div className={styles.timeContainer}>
                                                        <p className={styles.userName}>{comment.displayName}</p>
                                                        {comment.timestamp ? <ReactTimeAgo className={styles.time}
                                                            date={comment.timestamp.toDate()} locale="en-US" /> : null}
                                                    </div>
                                                    {comment.isEdit ? <div className={styles.editCommentContainer}>
                                                        <Input
                                                            defaultValue={comment.comment}
                                                            onChange={onEditChange}
                                                            onKeyPress={(e) => updateIt(e, comment.commentID)}
                                                        />
                                                        <Button onClick={() => uneditableComment(comment.commentID)} variant="contained" color="primary">Cancel</Button>
                                                    </div>
                                                        : <p className={styles.comment}>{comment.comment}</p>}
                                                    <div className={styles.editContainer}>
                                                        {user && user.uid === comment.userID ?
                                                            <Edit key={comment.commentID} onClick={() => editableComment(comment.commentID)} /> : null}
                                                        {user && (user.uid === comment.userID || user.uid === comment.authorID) ?
                                                            <Delete onClick={() => deleteComment(comment.commentID)} /> : null}
                                                    </div>
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