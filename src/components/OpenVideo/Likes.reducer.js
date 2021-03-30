
import { VIDEO_LIKES, VIDEO_DISLIKES } from './Likes.actions';

const INITIAL_STATE = {
    likes: 0,
    dislikes: 0
};

const likesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case VIDEO_LIKES:
            return {
                ...state,
                likes: state.likes + action.payload
            };
        case VIDEO_DISLIKES:
            return {
                ...state,
                dislikes: state.dislikes + action.payload
            };

        default:
            return state;
    }
};

export default likesReducer;