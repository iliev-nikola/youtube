import { SHOW_PLAYLISTS } from '../actions/playlists';

const INITIAL_STATE = {
    playlists: []
};

const playlistReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHOW_PLAYLISTS:
            return {
                ...state,
                playlists: action.payload
            }
        default:
            return state
    }
};

export default playlistReducer;