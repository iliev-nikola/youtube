
import { VIDEO_LIKES, VIDEO_DISLIKES } from '../actions/likeOrDislike';

const INITIAL_STATE = {
    isLike: false,
    isDislike: false,
};

const likeReducer = (state = INITIAL_STATE, action) => {
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

export default likeReducer;