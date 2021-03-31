import { Link } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { auth } from '../../firebase';
import { getUser, getUserVideos } from '../../service';
import VideoCard from '../VideoCard/VideoCard';
import ScrollableTabsButtonAuto from './CurrentUserTabs';
import styles from './UserProfile.module.scss';
import { useDispatch, useSelector } from "react-redux";

export default function UserProfile({ sidebar, sideBarContainer }) {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [myVideos, setMyVideos] = useState([]);
    const [history, setHistory] = useState([]);
    const [liked, setLiked] = useState([]);
    const currentUser = useSelector(getUser);

    useEffect(() => {
        // get videos, history, liked with query params
        getUser(id)
            .then(res => {
                setUser(res);
                return Promise.all([getUserVideos(res.videos), getUserVideos(res.history), getUserVideos(res.liked)]);
            })
            .then(res => {
                setMyVideos(res[0]);
                setHistory(res[1]);
                setLiked(res[2]);
            })
    }, [id, user]);

    return (
        <div className='mainContainer'>
            <div className={sidebar ? 'open' : 'close'}>
                {sideBarContainer}
            </div>
            <div className={styles.videoContainer}>
                <div className={styles.profileInfo}>
                    {user && currentUser ?
                        <>
                            {user.photoURL && <img src={user.photoURL} alt='user logo' />}
                            {!user.photoURL && <h1 className={styles.icon}>{user.name[0]}</h1>}
                            <div className={styles.infoBox}>
                                <h1 className={styles.names}>{user.name}</h1>
                                {user.userId === currentUser.uid ? <h1 className={styles.email}>{user.email}</h1> : null}
                            </div>
                        </> : null}
                </div>
                {user && currentUser ?
                    <ScrollableTabsButtonAuto videos={myVideos}
                        history={user.userId === currentUser.uid ? history : null} liked={liked} /> : null}
            </div >
        </div >
    )
}