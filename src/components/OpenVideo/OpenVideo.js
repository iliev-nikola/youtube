import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import styles from './OpenVideo.module.scss';
import ReactPlayer from 'react-player';
import { ThumbDown as ThumbDownIcon, ThumbUp, Edit, Delete } from '@material-ui/icons';
import PopUp from './PopupState';
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
import VideoCard from '../VideoCard/VideoCard';
import CommentsContainer from './CommentsContainer';

export default function OpenVideo() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);

    const videos = useSelector(getVideos);
    const video = useSelector(state => videos.find(video => video.id === id));
    const comments = useSelector(getVideoComments);
    const user = useSelector(getUser);

    useEffect(() => {
        if (user.uid && video.id) {
            setIsLiked(video.isLikedBy.some(userID => userID === user.uid));
            setIsDisliked(video.isDislikedBy.some(userID => userID === user.uid));
        }
    }, [video.isLikedBy, video.isDislikedBy, video.id, user.uid])

    useEffect(() => {
        dispatch(getComments(id));
    }, [id]);

    useEffect(() => {
        dispatch(changeViews());
    }, []);

    const likeIt = () => {
        likeVideo(user, video);
        updatedNotifications(video, user, 'like');
        setIsLiked(video.isLikedBy.some(userID => userID === user.uid));
        setIsDisliked(video.isDislikedBy.some(userID => userID === user.uid));
    }

    const dislikeIt = () => {
        dislikeVideo(user, video);
        updatedNotifications(video, user, 'dislike');
        setIsLiked(video.isLikedBy.some(userID => userID === user.uid));
        setIsDisliked(video.isDislikedBy.some(userID => userID === user.uid));
    }

    const text = 'Sign in to make your opinion count.';
    const numberLikes = (
        <><ThumbUp className={isLiked ? styles.liked : styles.button} onClick={() => { likeIt() }} /><span>{video.id ? video.isLikedBy.length : null}</span></>
    );
    const loggedNumberLikes = (
        <><PopUp text={text} button={<ThumbUp className={styles.button} />} content={'Like this video?'} /><span>{video.id ? video.isLikedBy.length : null}</span></>
    );
    const numberDislikes = (
        <><ThumbDownIcon className={isDisliked ? styles.disliked : styles.button} onClick={() => { dislikeIt() }} /><span>{video.id ? video.isDislikedBy.length : null}</span></>
    );
    const loggedNumberDIslikes = (
        <><PopUp text={text} button={<ThumbDownIcon className={styles.button} />} content={`Don't like this video?`} /><span>{video.id ? video.isDislikedBy.length : null}</span></>
    );

    return (
        <>
            <Header />
            <div className={styles.videoContainer}>
                <div className={styles.container}>
                    <ReactPlayer url={video.url} controls playing={true} className={styles.video} />
                    <div className={styles.hashtags}>
                        {`#${video.title} #video #${video.views} #youtube`}
                    </div>
                    <div className={styles.infoContainer}>
                        <p className={styles.title}>{video.title}</p>
                        <div className={styles.likesContainer}>
                            <div className={styles.views}>{video.views} views</div>
                            <div className={styles.thumbs}>
                                {user ? <>{numberLikes}</> : <>{loggedNumberLikes}</>}
                                {user ? <>{numberDislikes}</> : <>{loggedNumberDIslikes}</>}
                                {video ? <PlaylistModal video={video} /> : null}
                            </div>
                        </div>
                    </div>
                    <div className={styles.videoInfo}>
                        <UserLogo author={video.author} authorPhotoURL={video.authorPhotoURL} className />
                        <span className={styles.descr}>{video.description}</span>
                    </div>
                    <CommentsContainer currentVideo={video} comments={comments} id={id} />
                </div>

                {/* TODO: Separate in new component */}
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