import { Link } from "@material-ui/core";
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
                    <Link to={`/video/${video.id}`} className='link' key={video.id}>
                        <div >
                            <VideoCard url={video.url} title={video.title} duration={video.duration} />
                        </div>
                    </Link>
                )) : <img src={image} alt='No search results' id='noSearchResImg' />}
            </div>
        </div>
    )
}