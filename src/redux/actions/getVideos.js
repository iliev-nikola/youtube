import { db } from "../../firebase";
import { getVideos } from "../selectors/getVideos";
import { setLoading, setNotLoading } from '../actions/loadingBar';
export const FETCH_VIDEOS_SUCCEEDED = 'FETCH_VIDEOS_SUCCEEDED';
export const FETCH_VIDEOS_REQUESTED = 'FETCH_VIDEOS_REQUESTED';

export const fetchVideosRequested = () => ({
    type: FETCH_VIDEOS_REQUESTED,
});

export const fetchVideosSucceded = (videos) => ({
    type: FETCH_VIDEOS_SUCCEEDED,
    payload: videos,
});

// if failed!!!!!!!

export const fetchVideos = () => {
    return function (dispatch, getState) {
        dispatch(setLoading());
        db.collection('videos').onSnapshot(snapshot => {
            let dbVideos = [];
            // snapshot maybe is not necessery????????
            // make a regular request
            snapshot.docs.forEach(doc => (dbVideos.push({
                id: doc.id,
                info: doc.data()
            })));

            dispatch(fetchVideosSucceded(dbVideos));
            dispatch(setNotLoading());
        });
    }
};