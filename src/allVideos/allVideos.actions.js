import { db } from "../firebase";

export const FETCH_VIDEOS_SUCCEEDED = 'FETCH_VIDEOS_SUCCEEDED';
export const FETCH_VIDEOS_REQUESTED = 'FETCH_VIDEOS_REQUESTED';

export const fetchVideosRequested = () => ({
    type: FETCH_VIDEOS_REQUESTED,
});

export const fetchVideosSucceded = (videos) => ({
    type: FETCH_VIDEOS_SUCCEEDED,
    payload: videos,
});

export const fetchVideos = () => {
    return function (dispatch, getState) {
        const videos = getState().videos.videos;
        if (!videos.length) {
            dispatch(fetchVideosRequested());
            db.collection("videos2").onSnapshot(snapshot => {
                let dbVideos = [];
                snapshot.docs.map(doc => (dbVideos.push({
                    id: doc.id,
                    info: doc.data()
                })))
                dispatch(fetchVideosSucceded(dbVideos));
            })

        }
    }
};