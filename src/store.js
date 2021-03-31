import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import videoReducer from './redux/reducers/getVideos';
import likeReducer from './redux/reducers/likeOrDislike';
import userReducer from './redux/reducers/user';

// make store reducer keys singular instead plural
const rootReducer = combineReducers({
  videos: videoReducer,
  likeOrDislike: likeReducer,
  user: userReducer
});

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
