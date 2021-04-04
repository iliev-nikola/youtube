import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { db } from '../../firebase';
import ScrollableTabsButtonAuto from './CurrentUserTabs';
import styles from './UserProfile.module.scss';
import { useSelector } from "react-redux";
import { getUser } from '../../redux/selectors/user';
import Layout from '../Layout/Layout';

export default function UserProfile() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [history, setHistory] = useState([]);
    const [liked, setLiked] = useState([]);
    const currentUser = useSelector(getUser);

    useEffect(() => {
        db.collection('users').doc(id).get().then(res => setUser(res.data()));
    }, [id]);

    useEffect(() => {
        const videosRef = db.collection('videos');
        videosRef.where('isWatchedBy', 'array-contains', id).get()
            .then(res => res.docs.map(el => el.data()))
            .then(res => setHistory(res));
        videosRef.where('isLikedBy', 'array-contains', id).get()
            .then(res => res.docs.map(el => el.data()))
            .then(res => setLiked(res));
    }, [id]);

    return (
        <Layout>
            <div className={styles.profileContainer}>
                <div className={styles.profileInfo}>
                    {user && currentUser ?
                        <>
                            {user.photoURL && <img className={styles.icon} src={user.photoURL} alt='user logo' />}
                            {!user.photoURL && <h1 className={styles.icon}>{user.displayName[0]}</h1>}
                            <div className={styles.infoBox}>
                                <h1 className={styles.names}>{user.displayName}</h1>
                                {user.uid === currentUser.uid ? <h1 className={styles.email}>{user.email}</h1> : null}
                            </div>
                        </> : null}
                </div>
                {user && currentUser ?
                    <ScrollableTabsButtonAuto
                        history={user.userId === currentUser.uid ? history : null}
                        liked={liked}
                        user={user}
                        currentUser={currentUser} />

                    : null}
            </div >
        </Layout>
    )
}