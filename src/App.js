import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import './reset.css';
import SignUp from './Components/SignUp/SignUp';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import OpenVideo from './Components/OpenVideo/OpenVideo';
import SignIn from './Components/SignIn/SignIn';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import SignOut from './Components/SignOut/SignOut';
import UploadVideo from './Components/UploadVideo/UploadVideo';
import Search from './Components/Search/Search';
import UserProfile from './Components/UserProfile/UserProfile';
import TrendingVideos from './Components/TrendingVideos/TrendingVideos';
import History from './Components/History/History';
import { auth } from './firebase';
import VoiceControl from './Components/VoiceControl/VoiceControl';
import ProgressBar from './Components/ProgressBar/ProgressBar';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, logout } from './redux/actions/user';
import { getUser } from './redux/selectors/user';
import { getIsLoading } from './redux/selectors/loading';
import HomePage from './Components/HomePage/HomePage';
import AlertNotifier from './Components/common/AlertNotifier';
import { fetchTheme } from './redux/actions/theme';
import { fetchVideos } from './redux/actions/videos';
import Library from './Components/LibraryPage/UserPlaylists';
import { getNotifications } from './redux/actions/notifications';
import { changeThemeColors } from './utils';
import { deleteNotificationsOlderThanTwoHours } from './service';

export default function App() {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const isLoading = useSelector(getIsLoading);
  const theme = useSelector(state => state.theme.theme);

  useEffect(() => {
    dispatch(fetchVideos());
  }, [user]);

  useEffect(() => {
    if (theme) {
      changeThemeColors(theme);
    }
  }, [theme]);

  useEffect(() => {
    if (user) {
      dispatch(getNotifications(user.uid));
      changeThemeColors(user.theme);
    }
    dispatch(fetchTheme());
  }, [user, dispatch]);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(logout());
      }
    })
  }, [dispatch]);

  return (
    <Router>
      <VoiceControl />
      <>
        <AlertNotifier />
        <ProgressBar isOn={isLoading} />
        <Switch>
          <Route exact path='/' component={HomePage} />
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
            }}
          />
          <Route path='/reset'
            render={() => {
              if (auth.currentUser && user) {
                return <Redirect to='/' />
              } else {
                return <ResetPassword />
              }
            }} />
          <Route path='/auto-delete-notifications'>
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