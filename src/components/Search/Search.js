import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { filterVideos } from "../../service";
import VideoCard from "../VideoCard/VideoCard";
import image from './no-search-result.png';
import Layout from '../Layout/Layout';
import { setAlertOn } from '../../redux/actions/alertNotifier';
import { useDispatch } from "react-redux";
import styles from '../TrendingVideos/TrendingVideos.module.scss';


export default function Search() {
    let { id } = useParams();
    const params = id.split('+');
    const [filtered, setFiltered] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        filterVideos(params)
            .then(res => setFiltered(res))
            .catch(err => dispatch(setAlertOn('error', err.message)));
    }, [id]);
    return (
        <Layout>
            <div className={styles.videoContainer}>
                {
                    filtered.length ? filtered.map(video => (
                        <VideoCard key={video.id} views={video.views} url={video.url} title={video.title} duration={video.duration} id={video.id} author={video.author} authorPhotoURL={video.authorPhotoURL} />
                    )) : <img src={image} alt='No search results' id={styles.noSearchResImg} />
                }
            </div>
        </Layout >
    )
}