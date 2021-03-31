import { SET_USER } from '../actions/user';

const INITIAL_STATE = {
    user: null,
};

const userReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case SET_USER:
            return {
                ...state,
                user: payload.user
            };
        default:
            return state;
    }
};

export default userReducer;
