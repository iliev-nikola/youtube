// react
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './OpenVideo.module.scss';
// service
import { updateNotifications, dislikeVideo, likeVideo, subscribe, unsubscribe } from '../../service/service';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { changeViews } from '../../redux/actions/video';
import { getUser } from '../../redux/selectors/user';
import { getVideos } from '../../redux/selectors/videos';
import { getVideoComments } from '../../redux/selectors/video';
import { getComments } from '../../redux/actions/comments';
// components
import { ThumbDown as ThumbDownIcon, ThumbUp } from '@material-ui/icons';
import ReactPlayer from 'react-player';
import PopUp from './PopupState';
import PlaylistModal from '../LibraryPage/PlaylistModal';
import Header from '../Header/Header';
import CommentsContainer from './CommentsContainer';
import UserLogo from '../common/UserLogo/UserLogo';
import PlayNextVideos from './PlayNextVideos';

export default function OpenVideo() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const videos = useSelector(getVideos);
    const video = useSelector(state => videos.find(video => video.id === id));
    const comments = useSelector(getVideoComments);
    const user = useSelector(getUser);
    useEffect(() => {
        if (user.uid && video.id) {
            setIsLiked(video.isLikedBy.some(userID => userID === user.uid));
            setIsDisliked(video.isDislikedBy.some(userID => userID === user.uid));
        }
    }, [video.isLikedBy.length, video.isDislikedBy.length, video.id, user.uid]);

    useEffect(() => {
        if (user.uid && video.id) {
            setIsSubscribed(user.subscribes.some(id => id === video.authorID));
        }
    }, [video.id, user.uid, user.subscribes, video.authorID]);

    useEffect(() => {
        dispatch(getComments(id));
        dispatch(changeViews(video));
    }, []);

    const likeIt = () => {
        if (isLiked) return;
        likeVideo(user, video);
        updateNotifications(video, user, 'like');
        setIsLiked(true);
        setIsDisliked(false);
    };

    const dislikeIt = () => {
        if (isDisliked) return;
        dislikeVideo(user, video);
        updateNotifications(video, user, 'dislike');
        setIsDisliked(true);
        setIsLiked(false);
    };

    const subscribeIt = () => {
        subscribe(user, video);
        setIsSubscribed(true);
    };

    const unsubscribeIt = () => {
        unsubscribe(user, video);
        setIsSubscribed(false);
    };

    const text = 'Sign in to make your opinion count.';
    const numberLikes = (
        <><ThumbUp className={isLiked ? styles.liked : styles.button} onClick={likeIt} /><span>{video.id ? video.isLikedBy.length : null}</span></>
    );
    const loggedNumberLikes = (
        <><PopUp text={text} button={<ThumbUp className={styles.button} />} content={'Like this video?'} /><span>{video.id ? video.isLikedBy.length : null}</span></>
    );
    const numberDislikes = (
        <><ThumbDownIcon className={isDisliked ? styles.disliked : styles.button} onClick={dislikeIt} /><span>{video.id ? video.isDislikedBy.length : null}</span></>
    );
    const loggedNumberDislikes = (
        <><PopUp text={text} button={<ThumbDownIcon className={styles.button} />} content={`Don't like this video?`} /><span>{video.id ? video.isDislikedBy.length : null}</span></>
    );

    return (
        <>
            <Header />
            <div className={styles.videoContainer}>
                <div className={styles.container}>
                    <ReactPlayer url={video.url} controls playing={true} className={styles.video} />
                    <div className={styles.hashtags}>
                        {`#${video.title} #video #${video.views}views #youtube`}
                    </div>
                    <div className={styles.infoContainer}>
                        <p className={styles.title}>{video.title}</p>
                        <div className={styles.likesContainer}>
                            <div className={styles.views}>{video.views} views</div>
                            <div className={styles.thumbs}>
                                {user.uid ? numberLikes : loggedNumberLikes}
                                {user.uid ? numberDislikes : loggedNumberDislikes}
                                {video ? <PlaylistModal video={video} /> : null}
                            </div>
                        </div>
                    </div>
                    <div className={styles.videoInfo}>
                        <div>
                            <Link to={`/user/${video.authorID}`}><UserLogo author={video.author} authorPhotoURL={video.authorPhotoURL} /></Link>
                            <span className={styles.descr}>{video.description}</span>
                        </div>
                        {isSubscribed ? <div className={styles.unsubscribe} onClick={unsubscribeIt} title='Click for unsubscribe'>SUBSCRIBED</div> : <div className={styles.subscribe}
                            onClick={subscribeIt} title='Click for subscribe'>SUBSCRIBE</div>}
                    </div>
                    <CommentsContainer currentVideo={video} comments={comments} id={id} />
                </div>

                <PlayNextVideos />
            </div>
        </>
    );
}