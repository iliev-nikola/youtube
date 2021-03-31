import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import videosReducer from './allVideos/allVideos.reducer';
import likesReducer from './Components/OpenVideo/Likes.reducer';
import userReducer from './Components/redux/reducers/currentUser.reducer';
import themeReducer from './theme/theme.reducer';

const rootReducer = combineReducers({
  videos: videosReducer,
  likes: likesReducer,
  user: userReducer,
  theme : themeReducer
});

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
