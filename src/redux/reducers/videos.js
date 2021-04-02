import {
    FETCH_VIDEOS_SUCCEEDED, FETCH_VIDEOS_REQUESTED, UPDATE_VIDEO, FETCH_MY_VIDEOS_SUCCEEDED
} from '../actions/videos';

const INITIAL_STATE = {
    videos: [],
    myVideos: []
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_VIDEOS_REQUESTED:
            return {
                ...state,
            };

        case UPDATE_VIDEO: {
            const currentVideo = action.payload;
            const index = state.videos.findIndex(video => video.id === currentVideo.id);
            const copiedVideos = [...state.videos];
            copiedVideos.splice(index, 1, currentVideo);
            // copiedVideos.filter(video => video.id !== currentVideo.id);
            return {
                ...state,
                videos: copiedVideos
            }
        }
        case FETCH_VIDEOS_SUCCEEDED:
            return {
                ...state,
                videos: action.payload,
            };
        case FETCH_MY_VIDEOS_SUCCEEDED:
            return {
                ...state,
                myVideos: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
