import {
    FETCH_VIDEO, FETCH_VIDEOS_SUCCEEDED, FETCH_VIDEOS_REQUESTED, UPDATE_VIDEO, INCREASE_VIEWS
} from '../actions/videos';

const INITIAL_STATE = {
    videos: [],
    video: null
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_VIDEOS_REQUESTED:
            return {
                ...state,
            };
        case FETCH_VIDEO:
            return {
                ...state,
                video: action.payload,
            };
        case UPDATE_VIDEO: {
            const currentVideo = action.payload;
            const index = state.videos.findIndex(video => video.id === currentVideo.id);
            const copiedVideos = [...state.videos];
            copiedVideos.splice(index, 1, currentVideo);
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
        case INCREASE_VIEWS:
            return {
                ...state,
                video: { ...state.video, views: state.video.views + 1 }
            };
        default:
            return state;
    }
};

export default reducer;
