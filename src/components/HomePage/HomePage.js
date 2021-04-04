import { Link } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos } from '../../redux/actions/videos';
import { getVideos, getVideosLength } from '../../redux/selectors/videos';
import Layout from '../Layout/Layout';
import VideoCard from '../VideoCard/VideoCard';
import InfiniteScroll from "react-infinite-scroll-component";
import { setLoading, setNotLoading } from '../../redux/actions/loadingBar';

export default function HomePage() {
    const dispatch = useDispatch();
    const videos = useSelector(getVideos);
    const length = useSelector(getVideosLength);
    const [lastVideoIndex, setLastVideoIndex] = useState(0);
    const [visibleVideos, setVisibleVideos] = useState([])
    const [hasMore, setHasMore] = useState(true);
    const videosLimitOnPage = 25;
    const newVideosOnScroll = 4;
    useEffect(() => {
        dispatch(fetchVideos());
    }, []);

    useEffect(() => {
        setVisibleVideos(videos.slice(0, 16));
        setLastVideoIndex(videos.length < 16 ? 0 : 15);
    }, [length]);

    const fetchMoreData = () => {
        if (visibleVideos.length > videosLimitOnPage) {
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
    }

    return (
        <Layout>
            <InfiniteScroll
                className='videoContainer'
                dataLength={visibleVideos.length}
                next={fetchMoreData}
                hasMore={hasMore}
                scrollThreshold='1px'
                loader={<h4>Loading...</h4>}
                endMessage={
                    <div style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </div>
                }
            >
                {
                    visibleVideos.map(video => (
                        <Link to={`/video/${video.id}`} className='link' key={video.id + Math.random()}>
                            <div>
                                <VideoCard url={video.url} title={video.title} views={video.views} />
                            </div>
                        </Link>
                    ))
                }
            </InfiniteScroll>
        </Layout >
    )
}