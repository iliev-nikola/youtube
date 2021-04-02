import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import styles from './OpenVideo.module.scss';
import ReactPlayer from 'react-player';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import LikeOrDislikeVideo from './LikeOrDislikeVideo';
import { Input } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { dislikeIt, likeIt, changeViews, fetchVideo } from '../../redux/actions/videos';
import { getUser, getVideoComments } from '../../redux/selectors/selectors';
import { getComments } from '../../redux/actions/comments';
import { showUpdatedComments } from '../../redux/actions/comments';
import Layout from '../Layout/Layout';
import { getVideoURL, getVideoID, getVideoTitle, getVideoViews, getVideoAuthor, getVideoDescription, getVideoLikes, getVideoDislikes, getVideoAuthorID } from '../../redux/selectors/video';

export default function OpenVideo({ sidebar }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [inputValue, setInputValue] = useState('');
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const comments = useSelector(getVideoComments);
    const user = useSelector(getUser);
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
    }, [videoId, user])


    useEffect(() => {
        dispatch(getComments(id));
        dispatch(fetchVideo(id));
    }, []);

    useEffect(() => {
        if (videoId) {
            dispatch(changeViews());
        }
    }, [videoId]);


    const onInputChange = (e) => {
        setInputValue(e.currentTarget.value);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && inputValue) {
            dispatch(showUpdatedComments(id, user, inputValue));
            setInputValue('');
        }
    }
    const numberLikes = (
        <><ThumbUp className={isLiked ? styles.liked : styles.button} onClick={() => { dispatch(likeIt(id)) }} /><span>{videoId ? videoLikes.length : null}</span></>
    );
    const loggedNumberLikes = (
        <><LikeOrDislikeVideo button={<ThumbUp className={styles.button} />} content={'Like this video?'} /><span>{videoId ? videoLikes.length : null}</span></>
    );
    const numberDislikes = (
        <><ThumbDownIcon className={isDisliked ? styles.disliked : styles.button} onClick={() => { dispatch(dislikeIt(id)) }} /><span>{videoId ? videoDislikes.length : null}</span></>
    );
    const loggedNumberDIslikes = (
        <><LikeOrDislikeVideo button={<ThumbDownIcon className={styles.button} />} content={`Don't like this video?`} /><span>{videoId ? videoDislikes.length : null}</span></>
    );


    return (
        <Layout>
            <div className={sidebar ? styles.notActive : styles.mainContainer}>
                <div>
                    {videoId ?
                        <div>
                            <ReactPlayer url={videoURL} controls playing={true} className={styles.video} />
                            <div className={styles.hashtags}>
                                {`#${videoTitle} #video# ${videoViews} #youtube`}
                            </div>
                            <div className={styles.infoContainer}>
                                <p className={styles.title}>{videoTitle}</p>
                                <div className={styles.likesContainer}>
                                    <div className={styles.views}>{videoViews} views</div>
                                    <div className={styles.thumbs}>
                                        {user ? <>{numberLikes}</> : <>{loggedNumberLikes}</>}
                                        {user ? <>{numberDislikes}</> : <>{loggedNumberDIslikes}</>}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.videoInfo}>
                                <a className={styles.userLogo} href={`/user/${authorID}`}>{videoAuthor[0]}</a>
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
                                                <div className={styles.userLogo} onClick={() => history.push(`/user/${currentComment.userID}`)}>
                                                    {currentComment.photoURL && <img className={styles.userPic} src={currentComment.photoURL} alt='user logo' />}
                                                    {!currentComment.photoURL && <h1 className={styles.userPic}>{currentComment.displayName[0]}</h1>}
                                                </div>
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
        </Layout>
    );
}