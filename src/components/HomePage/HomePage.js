import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos } from '../../redux/actions/videos';
import { getVideos } from '../../redux/selectors/videos';
import Layout from '../Layout/Layout';
import VideoCard from '../VideoCard/VideoCard';
import InfiniteScroll from "react-infinite-scroll-component";
import { setLoading, setNotLoading } from '../../redux/actions/loadingBar';
import { setAlertOn } from '../../redux/actions/alertNotifier';
import styles from './HomePage.module.scss'
import { getUser } from '../../redux/selectors/user';

export default function HomePage() {
    const [lastVideoIndex, setLastVideoIndex] = useState(0);
    const [visibleVideos, setVisibleVideos] = useState([]);
    const [scrollTop, setScrollTop] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [videosLimitOnPage, setVideosLimitOnPage] = useState(0);


    const videos = useSelector(getVideos);
    const newVideosOnScroll = videos.length < 4 ? videos.length : 4;



    const dispatch = useDispatch();

    // TODO
    useEffect(() => {
        setVisibleVideos(videos.slice(0, 16));
        setLastVideoIndex(videos.length < 16 ? 0 : 15);
        setVideosLimitOnPage(videos.length * 2);
    }, [videos.length]);

    const fetchMoreData = () => {
        if (scrollTop > window.scrollY) return;
        if (visibleVideos.length > videosLimitOnPage) {
            dispatch(setAlertOn('info', 'No more videos to show. Check again later or upload some.'));
            return setHasMore(false);
        }

        dispatch(setLoading());
        let newVideos;
        const endIndex = lastVideoIndex + newVideosOnScroll;
        if (endIndex > videos.length) {
            const diff = endIndex - videos.length;
            newVideos = videos.slice(newVideosOnScroll - diff, videos.length);
            newVideos.concat(videos.slice(0, diff));
            setLastVideoIndex(diff - 1);
        } else {
            newVideos = visibleVideos.slice(lastVideoIndex, endIndex);
            setLastVideoIndex(endIndex);
        }

        setTimeout(() => {
            setVisibleVideos([...visibleVideos, ...newVideos]);
            dispatch(setNotLoading());
        }, 1000)
    };

    return (
        <Layout>
            <InfiniteScroll
                className={styles.videoContainer}
                dataLength={visibleVideos.length}
                next={fetchMoreData}
                hasMore={hasMore}
                onScroll={() => {
                    if (scrollTop < window.scrollY) {
                        setScrollTop(window.scrollY);
                    }
                }}
            >
                {
                    visibleVideos.map(video => (
                        <VideoCard key={video.id} {...video} />
                    ))
                }
            </InfiniteScroll>
        </Layout >
    )
}