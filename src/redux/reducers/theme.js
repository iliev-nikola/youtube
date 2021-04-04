
import { CHANGE_THEME } from '../actions/theme';

const whiteTheme = 'light';
const darkTheme = 'dark';

const INITIAL_STATE = {
    theme: 'dark'
};

const themeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHANGE_THEME:
            return { theme: state.theme === darkTheme ? whiteTheme : darkTheme }
        default:
            return state;
    }
};

export default themeReducer;