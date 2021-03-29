import { Link } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { auth } from '../../firebase';
import { getUser, getUserVideos } from '../../service';
import VideoCard from '../VideoCard/VideoCard';
import ScrollableTabsButtonAuto from './CurrentUserTabs';
import styles from './UserProfile.module.scss';

export default function UserProfile({ sidebar, sideBarContainer }) {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [myVideos, setMyVideos] = useState([]);
    const [history, setHistory] = useState([]);
    const [liked, setLiked] = useState([]);

    useEffect(() => {
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
                    {/* check for imageURL */}
                    <h1 className={styles.icon}>{user ? user.name[0] : null}</h1>
                    <div className={styles.infoBox}>
                        <h1 className={styles.names}>{user ? user.name : null}</h1>
                        {/* if is logged in */}
                        <h1 className={styles.email}>{user ? user.email : null}</h1>
                    </div>
                </div>
                {/* if is logged in */}
                <ScrollableTabsButtonAuto videos={myVideos} history={history} liked={liked} />
                {/* else */}
            </div >
        </div >
    )
}