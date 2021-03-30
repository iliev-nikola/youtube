
import { VIDEO_LIKES, VIDEO_DISLIKES } from './Likes.actions';

const INITIAL_STATE = {
    isLike: false,
    isDislike: false,
};

const likesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case VIDEO_LIKES:
            return {
                ...state,
                isLike: true,
                isDislike: false
            };
        case VIDEO_DISLIKES:
            return {
                ...state,
                isLike: false,
                isDislike: true
            };

        default:
            return state;
    }
};

export default likesReducer;