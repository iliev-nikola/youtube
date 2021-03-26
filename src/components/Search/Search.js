import { Link } from "@material-ui/core";
import { useParams } from "react-router";
import { filterVideos } from "../../utils";
import VideoCard from "../VideoCard/VideoCard";
import image from './no-search-result.png';

export default function Search({ slidebar, slideBarContainer }) {
    let { id } = useParams();
    const params = id.split('+');
    const filtered = filterVideos(params);
    return (
        <div className='mainContainer'>
            <div className={slidebar ? 'open' : 'close'}>
                {slideBarContainer}
            </div>
            <div className='videoContainer'>
                {filtered.length ? filtered.map(video => (
                    <Link to={`/video/${video.id}`} className='link' key={video.id}>
                        <div >
                            <VideoCard url={video.url} title={video.title} author={video.artist} duration={video.duration} />
                        </div>
                    </Link>
                )) : <img src={image} alt='No search results' id='noSearchResImg' />}
            </div>
        </div>
    )
}