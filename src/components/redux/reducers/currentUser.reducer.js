import {
    CURRENT_USER
} from '../actions/currentUser.action';

const INITIAL_STATE = {
    user: null
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CURRENT_USER:
            return {
                ...state,
                user: action.payload
            
    };

        default:
            return state;
    }
};

export default userReducer;
