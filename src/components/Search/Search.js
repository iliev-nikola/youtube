import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { filterVideos } from "../../service";
import VideoCard from "../VideoCard/VideoCard";
import image from './no-search-result.png';
import Layout from '../Layout/Layout';
import { setAlertOn } from '../../redux/actions/alertNotifier';
import { useDispatch } from "react-redux";

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
            {
                filtered ? filtered.map(video => (
                    <a href={`/video/${video.id}`} className='link' key={video.id}>
                        <div >
                            <VideoCard url={video.url} title={video.title} duration={video.duration} id={video.id} author={video.author} authorPhotoURL={video.authorPhotoURL} />
                        </div>
                    </a>
                )) : <img src={image} alt='No search results' id='noSearchResImg' />
            }
        </Layout>
    )
}