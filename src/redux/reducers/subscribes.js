import {
    FETCH_SUBSCRIBES
} from '../actions/subscribes';

const INITIAL_STATE = {
    subscribes: []
};

const subscribesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case FETCH_SUBSCRIBES:
            return {
                ...state,
                subscribes: action.payload,
            };

        default:
            return state;
    }
};

export default subscribesReducer;