import {
    FETCH_VIDEOS_SUCCEEDED, FETCH_VIDEOS_REQUESTED
} from '../actions/getVideos';

const INITIAL_STATE = {
    videos: []
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_VIDEOS_REQUESTED:
            return {
                ...state,
            };
        case FETCH_VIDEOS_SUCCEEDED:
            return {
                ...state,
                videos: action.payload,
            };

        default:
            return state;
    }
};

export default reducer;
