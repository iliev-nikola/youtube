
import { SIDEBAR_OPEN, SIDEBAR_CLOSE, TOGGLE_SIDEBAR } from '../actions/sidebar';

const INITIAL_STATE = {
    isOpen: false
};

const sidebarReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIDEBAR_OPEN:
            return {
                ...state,
                isOpen: true
            };
        case SIDEBAR_CLOSE:
            return {
                ...state,
                isOpen: false
            };
        case TOGGLE_SIDEBAR:
            return {
                ...state,
                isOpen: !state.isOpen
            };
        default:
            return state;
    }
};

export default sidebarReducer;