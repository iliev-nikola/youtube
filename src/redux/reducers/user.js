import { SET_USER, LOGOUT_USER } from '../actions/user';

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
        case LOGOUT_USER:
            return {
                ...state,
                user: null
            };
        default:
            return state;
    }
};

export default userReducer;
