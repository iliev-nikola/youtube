import { Link } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos } from '../../redux/actions/videos';
import { getVideos } from '../../redux/selectors/videos';
import Layout from '../Layout/Layout';
import VideoCard from '../VideoCard/VideoCard';
import InfiniteScroll from "react-infinite-scroll-component";

export default function HomePage() {
    const dispatch = useDispatch();
    let videos = useSelector(getVideos);
    const [visibleVideos, setVisibleVideos] = useState([]);
    const [length, setLength] = useState(0);
    useEffect(() => {
        dispatch(fetchVideos());
        // setLength(videos.length);
    }, []);

    const fetchMoreData = () => {
        videos = videos.concat(videos.slice(4));
    }

    return (
        <Layout>
            {/* <InfiniteScroll
                className='videoContainer'
                dataLength={4}
                next={fetchMoreData}
                children={visibleVideos}
                hasMore={true}
                scrollThreshold="200px"
                loader={<h4>Loading...</h4>}
            > */}
            {visibleVideos.map(video => (
                <Link to={`/video/${video.id}`} className='link' key={video.id + Math.random()}>
                    <div>
                        <VideoCard url={video.url} title={video.title} views={video.views} />
                    </div>
                </Link>
            ))}
            {/* </InfiniteScroll> */}
        </Layout >
    )
}