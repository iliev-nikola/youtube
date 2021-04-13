// react
import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
// service
import { deleteNotificationsOlderThanTwoHours } from './service/service';
import { auth } from './service/firebase';
// utils
import { changeThemeColors } from './utils';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { setUser, logout } from './redux/actions/user';
import { getUser } from './redux/selectors/user';
import { getIsLoading } from './redux/selectors/loading';
import { fetchTheme } from './redux/actions/theme';
import { fetchVideos } from './redux/actions/videos';
import { getVideosLength } from './redux/selectors/videos';
// components
import SignUp from './components/SignUp/SignUp';
import ErrorPage from './components/ErrorPage/ErrorPage';
import OpenVideo from './components/OpenVideo/OpenVideo';
import SignIn from './components/SignIn/SignIn';
import ResetPassword from './components/ResetPassword/ResetPassword';
import SignOut from './components/SignOut/SignOut';
import UploadVideo from './components/UploadVideo/UploadVideo';
import Search from './components/Search/Search';
import UserProfile from './components/UserProfile/UserProfile';
import TrendingVideos from './components/TrendingVideos/TrendingVideos';
import History from './components/History/History';
import VoiceControl from './components/VoiceControl/VoiceControl';
import ProgressBar from './components/ProgressBar/ProgressBar';
import HomePage from './components/HomePage/HomePage';
import AlertNotifier from './components/common/AlertNotifier';
import Library from './components/LibraryPage/UserPlaylists';
import Subscriptions from './components/Subscriptions/Subscriptions';

export default function App() {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const isLoading = useSelector(getIsLoading);
  const videosLength = useSelector(getVideosLength);

  // Initial load of the current user and all videos
  useEffect(() => {
    dispatch(fetchVideos());
    

    auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(logout());
      }
    });
  }, []);

  // Initial load of the theme
  useEffect(() => {
    if (user.theme) {
      changeThemeColors(user.theme);
    } else {
      changeThemeColors('dark');
    }
    dispatch(fetchTheme());
  }, [user.theme, dispatch]);

  if (!videosLength) {
    return null;
  }

  return (
    <Router>
      <VoiceControl />
      <>
        <AlertNotifier />
        <ProgressBar isOn={isLoading} />
        <Switch>
          <Route exact path='/' >
            {/* <Header /> */}
            <HomePage />
            </Route>
          <Route path='/video/:id' component={OpenVideo} />
          <Route path='/search/:id' component={Search} />
          <Route exact path='/search'>
            <Redirect to='/' />
          </Route>
          <Route path='/upload' component={UploadVideo} />
          <Route path='/user/:id' component={UserProfile} />
          <Route path='/library' component={Library} />
          <Route path='/trending' component={TrendingVideos} />
          <Route path='/history' component={History} />
          <Route path='/subscriptions' component={Subscriptions} />
          <Route path='/signout'
            render={() => {
              if (auth.currentUser && user) {
                return <SignOut />
              } else {
                return <Redirect to='/' />
              }
            }}
          />
          <Route path='/signup'
            render={() => {
              if (auth.currentUser && user) {
                return <Redirect to='/' />
              } else {
                return <SignUp />
              }
            }} />
          <Route path='/signin'
            render={() => {
              if (auth.currentUser && user) {
                return <Redirect to='/' />
              } else {
                return <SignIn />
              }
            }} />
          <Route path='/reset'
            render={() => {
              if (auth.currentUser && user) {
                return <Redirect to='/' />
              } else {
                return <ResetPassword />
              }
            }} />
          <Route exact path='/auto-delete-notifications'>
            {deleteNotificationsOlderThanTwoHours()}
          </Route>
          <Route path='*'>
            <ErrorPage />
          </Route>
        </Switch>
      </>
    </Router >
  );
}