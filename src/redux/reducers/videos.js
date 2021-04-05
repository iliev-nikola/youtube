import {
    FETCH_VIDEOS_SUCCEEDED, FETCH_VIDEOS_REQUESTED, FETCH_MY_VIDEOS_SUCCEEDED,
    FETCH_VIDEO, INCREASE_VIEWS
} from '../actions/videos';

const INITIAL_STATE = {
    videos: [],
    myVideos: [],
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
