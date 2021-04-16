// react
import { useEffect, useState } from 'react';
import styles from './Subscriptions.module.scss';
// service
import { getUserSubscriptions } from '../../service/service';
// redux
import { useSelector } from 'react-redux';
import { getUser, getVideos } from '../../redux/selectors/selectors';
// components
import VideoCard from '../VideoCard/VideoCard';
import Layout from '../Layout/Layout';

export default function Subscriptions() {
    const [subscribes, setSubscribes] = useState([]);
    const user = useSelector(getUser);
    const videos = useSelector(getVideos);

    useEffect(() => {
        if (user && videos) {
            getUserSubscriptions(user.uid, videos).then(res => setSubscribes(res));
        }
    }, [user]);

    return (
        <Layout>
            {/* <h1 className={styles.welcomeText}>Subscriptions</h1> */}
            <div className={styles.videoContainer}>
                {
                    subscribes.length ? subscribes.map(video => (
                        <VideoCard key={video.id} url={video.url} title={video.title} views={video.views} id={video.id} author={video.author} authorPhotoURL={video.authorPhotoURL} />
                    )) : null
                }
            </div>
        </Layout >
    )
}