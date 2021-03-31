import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import themeReducer from './theme/theme.reducer';
import videoReducer from './redux/reducers/getVideos';
import likeReducer from './redux/reducers/likeOrDislike';
import userReducer from './redux/reducers/user';

// make store reducer keys singular instead plural
const rootReducer = combineReducers({
  videos: videoReducer,
  user: userReducer,
  theme: themeReducer,
  likeOrDislike: likeReducer,
});

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
