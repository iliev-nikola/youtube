import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import themeReducer from './redux/reducers/theme';
import videoReducer from './redux/reducers/videos';
import userReducer from './redux/reducers/user';
import commentsReducer from './redux/reducers/comments';
import loadingReducer from './redux/reducers/loadingBar';
import alertReducer from "./redux/reducers/alertNotifier";
import notificationReducer from './redux/reducers/notifications';
import playlistReducer from './redux/reducers/playlists';
// make store reducer keys singular instead plural
const rootReducer = combineReducers({
  videos: videoReducer,
  user: userReducer,
  theme: themeReducer,
  comments: commentsReducer,
  loading: loadingReducer,
  alert: alertReducer,
  notification: notificationReducer,
  playlist: playlistReducer
});

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
