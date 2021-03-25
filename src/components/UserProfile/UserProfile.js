import { Link } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getUser, getUserVideos } from '../../service';
import VideoCard from '../VideoCard/VideoCard';
import styles from './UserProfile.scss';

export default function UserProfile({ slidebar, slideBarContainer }) {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        getUser(id)
            .then(res => {
                setUser(res);
                return getUserVideos(res.videos);
            })
            .then(res => {
                setVideos(res);
            })
    }, [id]);

    return (
        <div className='mainContainer'>
            <div className={slidebar ? 'open' : 'close'}>
                {slideBarContainer}
            </div>
            <div className='videoContainer'>
                {videos.map(video => (
                    <a href={`/video/${video.id}`} className='link' key={video.id}>
                        <div >
                            <VideoCard url={video.url} title={video.title} author={video.artist} duration={video.duration} />
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}