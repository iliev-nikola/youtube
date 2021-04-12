import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import themeReducer from './redux/reducers/theme';
import videosReducer from './redux/reducers/videos';
import userReducer from './redux/reducers/user';
import commentsReducer from './redux/reducers/comments';
import loadingReducer from './redux/reducers/loadingBar';
import alertReducer from './redux/reducers/alertNotifier';
import notificationReducer from './redux/reducers/notifications';
import playlistReducer from './redux/reducers/playlists';
import videoReducer from './redux/reducers/video';
import subscribesReducer from './redux/reducers/subscribes';

const rootReducer = combineReducers({
  videos: videosReducer,
  user: userReducer,
  theme: themeReducer,
  comments: commentsReducer,
  loading: loadingReducer,
  alert: alertReducer,
  notification: notificationReducer,
  playlist: playlistReducer,
  video: videoReducer,
  subscribes: subscribesReducer
});

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
