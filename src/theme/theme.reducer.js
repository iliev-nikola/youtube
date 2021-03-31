
export const DARK_MODE = 'DARK_MODE';
export const LIGHT_MODE = 'LIGHT_MODE';

const INITIAL_STATE = {
    theme: 'dark'
};

const themeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DARK_MODE:
            return {
                ...state
            };
        case LIGHT_MODE:
            return {
                ...state
            };

        default:
            return state;
    }
};

export default themeReducer;