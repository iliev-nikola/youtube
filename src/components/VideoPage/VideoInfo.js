import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './VideoPage.module.scss';
import { ThumbDown as ThumbDownIcon, ThumbUp } from '@material-ui/icons';
import PopUp from './PopupState';
import PlaylistModal from './PlaylistModal';
import UserLogo from '../common/UserLogo/UserLogo';
// service
import { subscribe, unsubscribe, likeOrDislikeVideo } from '../../service/service';

export default function VideoInfo({ video, user }) {
    const isVideoLiked = video.isLikedBy.includes(user.uid);
    const isVideoDisliked = video.isDislikedBy.includes(user.uid);
    const [isSubs, setIsSubs] = useState(false);
    useEffect(() => {
        if (user) {
            const isSubscribed = user.subscribes.includes(video.authorID);
            setIsSubs(isSubscribed);
        }
    }, [user, video.authorID])

    const thumbsText = 'Sign in to make your opinion count.';
    const subscribeText = 'Sign in to subscribe to this channel.';
    const numberLikes = (
        <><ThumbUp className={isVideoLiked ? styles.liked : styles.button} onClick={() => likeOrDislikeVideo(user, video)} /><span>{video.id ? video.isLikedBy.length : null}</span></>
    );
    const loggedNumberLikes = (
        <><PopUp text={thumbsText} button={<ThumbUp className={styles.button} />} content={'Like this video?'} /><span>{video.id ? video.isLikedBy.length : null}</span></>
    );
    const numberDislikes = (
        <><ThumbDownIcon className={isVideoDisliked ? styles.disliked : styles.button} onClick={() => likeOrDislikeVideo(user, video)} /><span>{video.id ? video.isDislikedBy.length : null}</span></>
    );
    const loggedNumberDislikes = (
        <><PopUp text={thumbsText} button={<ThumbDownIcon className={styles.button} />} content={`Don't like this video?`} /><span>{video.id ? video.isDislikedBy.length : null}</span></>
    );

    const guestSubscribe = (
        <>
            <PopUp text={subscribeText} button={<div className={styles.subscribe}>SUBSCRIBE</div>} content={`Want to subscribe to this channel?`} />
        </>
    );
    const userSubscribe = (
        <>
            {isSubs ? <div className={styles.unsubscribe} onClick={() => unsubscribe(user, video)} title='Click for unsubscribe'>SUBSCRIBED</div> : <div className={styles.subscribe}
                onClick={() => subscribe(user, video)} title='Click for subscribe'>SUBSCRIBE</div>}
        </>
    );
    return (
        <>
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
                {user.uid ? userSubscribe : guestSubscribe}
            </div>
        </>
    )
}