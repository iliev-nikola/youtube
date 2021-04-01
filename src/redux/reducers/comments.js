import {
    SHOW_COMMENTS, UPDATE_COMMENTS
} from '../actions/comments';

const INITIAL_STATE = {
    comments: []
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHOW_COMMENTS:
            return {
                ...state,
                comments: action.payload
            };
        case UPDATE_COMMENTS:
            return {
                ...state,
                comments: action.payload
            }
        default:
            return state;
    }
};

export default reducer;
