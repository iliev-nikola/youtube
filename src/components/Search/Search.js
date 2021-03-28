import { useParams } from "react-router";
import { filterVideos } from "../../utils";
import VideoCard from "../VideoCard/VideoCard";
import image from './no-search-result.png';

export default function Search({ sidebar, sideBarContainer }) {
    let { id } = useParams();
    const params = id.split('+');
    const filtered = filterVideos(params);
    return (
        <div className='mainContainer'>
            <div className={sidebar ? 'open' : 'close'}>
                {sideBarContainer}
            </div>
            <div className='videoContainer'>
                {filtered.length ? filtered.map(video => (
                    <a href={`/video/${video.id}`} className='link' key={video.id}>
                        <div >
                            <VideoCard url={video.url} title={video.title} duration={video.duration} />
                        </div>
                    </a>
                )) : <img src={image} alt='No search results' id='noSearchResImg' />}
            </div>
        </div>
    )
}