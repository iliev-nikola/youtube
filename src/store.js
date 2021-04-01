import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import themeReducer from './theme/theme.reducer';
import videoReducer from './redux/reducers/videos';
import userReducer from './redux/reducers/user';
import commentsReducer from './redux/reducers/comments';

// make store reducer keys singular instead plural
const rootReducer = combineReducers({
  videos: videoReducer,
  user: userReducer,
  theme: themeReducer,
  comments: commentsReducer
});

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
