import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { filterVideos } from "../../utils";
import VideoCard from "../VideoCard/VideoCard";
import image from './no-search-result.png';
import Layout from '../Layout/Layout';

export default function Search() {
    let { id } = useParams();
    const params = id.split('+');
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        filterVideos(params).then(res => setFiltered(res));
    }, [id])
    return (
        <Layout>
            <div className='mainContainer'>
                <div className='videoContainer'>
                    {
                        filtered ? filtered.map(video => (
                            <a href={`/video/${video.id}`} className='link' key={video.id}>
                                <div >
                                    <VideoCard url={video.url} title={video.title} duration={video.duration} />
                                </div>
                            </a>
                        )) : <img src={image} alt='No search results' id='noSearchResImg' />
                    }
                </div>
            </div>
        </Layout>
    )
}