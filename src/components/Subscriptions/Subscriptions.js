// react
import { useEffect } from 'react';
import styles from './Subscriptions.module.scss';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../redux/selectors/user';
import { showSubscribes } from '../../redux/actions/subscribes';
// components
import VideoCard from '../VideoCard/VideoCard';
import Layout from '../Layout/Layout';

export default function Subscriptions() {
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const subscribes = useSelector(state => state.subscribes.subscribes);
    useEffect(() => {
        if (user.uid) {
            dispatch(showSubscribes(user));
        }
    }, [user, dispatch]);

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