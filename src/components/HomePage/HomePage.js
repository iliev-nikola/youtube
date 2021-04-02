import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos } from '../../redux/actions/videos';
import { getVideos } from '../../redux/selectors/videos';
import Layout from '../Layout/Layout';
import VideoCard from '../VideoCard/VideoCard';
import InfiniteScroll from "react-infinite-scroll-component";

export default function HomePage() {
    const dispatch = useDispatch();
    const videos = useSelector(getVideos);
    const [lastShown, setLastShown] = useState('');
    const [visibleVideos, setVisibleVideos] = useState([]);
    useEffect(() => {
        dispatch(fetchVideos());

    }, []);

    useEffect(() => {
        if (videos) {
            const initialState = videos.slice(0, 4);
            setVisibleVideos(initialState);
        }
    }, [])

    let fetchMoreData = () => {
        let shownVideos = [];
        let startIndex = videos.findIndex((video) => video.id === lastShown) + 1;
        shownVideos = videos.slice(startIndex, startIndex + 3);
        setVisibleVideos([...visibleVideos, ...shownVideos]);
        setLastShown(shownVideos[shownVideos.length - 1].id);
    };

    return (
        <Layout>
            <div className='videoContainer'>
                <InfiniteScroll
                    dataLength={visibleVideos.length}
                    next={fetchMoreData}
                    hasMore={videos.length > visibleVideos.length}
                    loader={<h4>Loading...</h4>}
                >
                    {
                        visibleVideos.map(video => (
                            <Link to={`/video/${video.id}`} className='link' key={video.id}>
                                <div>
                                    <VideoCard url={video.url} title={video.title} views={video.views} />
                                </div>
                            </Link>
                        ))
                    }
                </InfiniteScroll>
            </div>
        </Layout >
    )
}