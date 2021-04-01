import { Link } from 'react-router-dom';
// import { Link } from '@material-ui/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos } from '../../redux/actions/getVideos';
import { getVideos } from '../../redux/selectors/getVideos';
import Layout from '../Layout/Layout';
import VideoCard from '../VideoCard/VideoCard';

export default function HomePage() {
    const dispatch = useDispatch();
    const videos = useSelector(getVideos);
    useEffect(() => {
        dispatch(fetchVideos());
    }, []);

    return (
        <Layout>
            <div className='videoContainer'>
                {
                    videos.length ? videos.map(video => (
                        <Link to={`/video/${video.id}`} className='link' key={video.id}>
                            <div>
                                <VideoCard url={video.info.url} title={video.info.title} views={video.info.views} />
                            </div>
                        </Link>
                    )) : null
                }
            </div>
        </Layout>
    )
}