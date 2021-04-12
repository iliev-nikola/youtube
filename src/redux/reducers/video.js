import { FETCH_VIDEO, INCREASE_VIEWS } from '../actions/video';

const INITIAL_STATE = {
    video: {}
};

const videoReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case FETCH_VIDEO:
            return {
                ...state,
                video: action.payload,
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

export default videoReducer;
