
import { CHANGE_THEME } from './theme';

const whiteTheme = 'white';
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