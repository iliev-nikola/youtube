// react
import { useEffect, useState } from 'react';
import styles from './Subscriptions.module.scss';
// redux
import { useSelector } from 'react-redux';
import { getUser } from '../../redux/selectors/selectors';
// components
import VideoCard from '../VideoCard/VideoCard';
import Layout from '../Layout/Layout';

export default function Subscriptions() {
    const user = useSelector(getUser);
    const [subscribes, setSubscribes] = useState([]);
    const videos = useSelector(state => state.videos.videos);
    useEffect(() => {
        if (user) {
            const userSubscribes = [];
            user.subscribes.forEach(el => {
                const filterVideos = videos.filter(video => video.authorID === el);
                userSubscribes.push(...filterVideos);
            })
            setSubscribes(userSubscribes);
        }
    }, [user, videos]);

    return (
        <Layout>
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