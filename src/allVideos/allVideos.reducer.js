import {
    FETCH_VIDEOS_SUCCEEDED, FETCH_VIDEOS_REQUESTED
} from './allVideos.actions';

const INITIAL_STATE = {
    videos: [],
    isLoading: false
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_VIDEOS_REQUESTED:
            return {
                ...state,
                isLoading: true,
            };
        case FETCH_VIDEOS_SUCCEEDED:
            return {
                ...state,
                videos: action.payload,
                isLoading:false
            };

        default:
            return state;
    }
};

export default reducer;
