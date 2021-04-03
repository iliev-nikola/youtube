import {
    SHOW_NOTIFICATIONS, UPDATE_NOTIFICATIONS
} from '../actions/notifications';

const INITIAL_STATE = {
    notifications: []
};

const notificationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHOW_NOTIFICATIONS:
            return {
                ...state,
                notifications: action.payload
            };
        case UPDATE_NOTIFICATIONS:
            return {
                ...state,
                notifications: action.payload
            }
        default:
            return state;
    }
};

export default notificationReducer;
