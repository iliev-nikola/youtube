// redux
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import themeReducer from './reducers/theme';
import videosReducer from './reducers/videos';
import userReducer from './reducers/user';
// import commentsReducer from './reducers/comments';
import loadingReducer from './reducers/loadingBar';
import alertReducer from './reducers/alertNotifier';
import playlistsReducer from './reducers/playlists';

const rootReducer = combineReducers({
  videos: videosReducer,
  user: userReducer,
  theme: themeReducer,
  // comments: commentsReducer,
  loading: loadingReducer,
  alert: alertReducer,
  playlists: playlistsReducer,
});

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
