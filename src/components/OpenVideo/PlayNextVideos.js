import styles from './OpenVideo.module.scss';
import VideoCard from '../VideoCard/VideoCard';
import { useSelector } from 'react-redux';
import { getVideos } from '../../redux/selectors/videos';
import { useEffect, useState } from 'react';

export default function PlayNextVideos() {
    const videos = useSelector(getVideos);
    console.log(videos)
    return (
        <div className={styles.otherVideos}>
            <h2>Play next</h2>
            {videos.length ? videos.slice(0, 10).map(video => (
                <VideoCard key={video.id + Math.random()} url={video.url} title={video.title} views={video.views} id={video.id} author={video.author} authorPhotoURL={video.authorPhotoURL} />
            )) : <h2>No videos to play next...</h2>}
        </div>
    )
}