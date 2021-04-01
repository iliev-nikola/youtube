import React, { useState, useEffect, useCallback } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import './App.scss';
import './reset.css';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import HistoryIcon from '@material-ui/icons/History';
import SignUp from './Components/SignUp/SignUp';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import VideoCard from './Components/VideoCard/VideoCard';
import Header from './Components/Header/Header';
import Sidebar from './Components/Sidebar/Sidebar';
import OpenVideo from './Components/OpenVideo/OpenVideo';
import SignIn from "./Components/SignIn/SignIn";
import ResetPassword from './Components/ResetPassword/ResetPassword';
import SignOut from "./Components/SignOut/SignOut";
import UploadVideo from './Components/UploadVideo/UploadVideo';
import { getUser, getVideos } from './redux/selectors/selectors';
import Search from "./Components/Search/Search";
import UserProfile from "./Components/UserProfile/UserProfile";
import { auth } from "./firebase";
import VoiceControl from './Components/VoiceControl/VoiceControl';
import ProgressBar from "./Components/ProgressBar/ProgressBar";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from "react-redux";
import { handleDarkMode } from './theme/theme';
import { fetchVideos } from './redux/actions/videos';
import { getComments } from './redux/actions/comments';

export default function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const videos = useSelector(getVideos);
  const [sidebar, setSidebar] = useState(false);
  const user = useSelector(getUser);
  // const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    dispatch(handleDarkMode());

  }, [dispatch])

  // useEffect(() => {
  //   auth.onAuthStateChanged(user => {
  //     if (user) {
  //       dispatch(setUser(user));
  //     } else {
  //       dispatch(setUser(null));
  //     }
  //   })
  // }, [dispatch])

  useEffect(() => {
    dispatch(fetchVideos());
    if (videos.length) {
      setLoading(false);
    }
  }, [videos, dispatch]);

  // const fetchMoreData = useCallback(() => {
  //   setLoading(true);

  //   if (videos.length >= 100) {
  //     setHasMore(false);
  //     setLoading(false);
  //   }

  //   setTimeout(() => {
  //     getAllVideos().then((result) => setVideos(videos.concat(result)));
  //     setLoading(false)
  //   }, 1000)
  // }, [videos]);

  // HEADER & SIDEBAR
  const handleToggleSidebar = () => {
    setSidebar(value => !value);
  }

  const header = <Header handleToggleSidebar={handleToggleSidebar} sidebar={sidebar} />;
  const sideBarContainer = (<>
    <Sidebar sidebar={sidebar} Icon={HomeIcon} type={'Home'} />
    <Sidebar sidebar={sidebar} Icon={WhatshotIcon} type={'Trending'} />
    <Sidebar sidebar={sidebar} Icon={VideoLibraryIcon} type={'Library'} />
    <Sidebar sidebar={sidebar} Icon={HistoryIcon} type={'History'} />
  </>)

  return (

    <Router>

      <VoiceControl />
      <>
        <ProgressBar isOn={loading} />
        <Switch>
          <Route exact path="/">
            {header}
            {/* make component for home page */}
            <div className='mainContainer' onClick={(e) => {
              if (e.target.className === 'mainContainer') setSidebar(false);
            }}>
              <div className='sideContainer'>
                <div className={sidebar ? 'open' : 'close'}>
                  {sideBarContainer}
                </div>
              </div>
              <div className={!sidebar ? 'videoContainer' : 'notActive'}>
                {/* <InfiniteScroll
                  // className={!sidebar ? 'videoContainer' : 'notActive'}
                  dataLength={videos.length}
                  // next={fetchMoreData}
                  hasMore={true}
                  // scrollThreshold="100%"
                  loader={<h4>Loading...</h4>}
                > */}
                {videos.length ? videos.map(video => (
                  <Link to={`/video/${video.id}`} className='link' key={video.id} >
                    <div>
                      <VideoCard url={video.url} title={video.title} views={video.views} />
                    </div>
                  </Link>
                )) : null}
                {/* </InfiniteScroll> */}
              </div>
            </div>
          </Route>
          <Route path="/video/:id">
            {header}
            <div className={sidebar ? 'open' : 'notVisible'}>
              {sideBarContainer}
            </div>
            <OpenVideo sidebar={sidebar} />
          </Route>
          <Route exact path="/search/">
            <Redirect to="/" />
          </Route>
          <Route path="/search/:id">
            {header}
            <Search sidebar={sidebar} sideBarContainer={sideBarContainer} />
          </Route>
          <Route exact path="/upload">
            <UploadVideo />
          </Route>
          <Route path="/user/:id">
            {header}
            <UserProfile sidebar={sidebar} sideBarContainer={sideBarContainer} />
          </Route>
          <Route path="/signout"
            render={() => {
              if (auth.currentUser && user) {
                return <SignOut />
              } else {
                return <Redirect to='/' />
              }
            }} />
          <Route path="/signup"
            render={() => {
              if (auth.currentUser && user) {
                return <Redirect to='/' />
              } else {
                return <SignUp />
              }
            }} />
          <Route path="/signin"
            render={() => {
              if (auth.currentUser && user) {
                return <Redirect to='/' />
              } else {
                return <SignIn />
              }
            }}
          />
          <Route exact path="/reset"
            render={() => {
              if (auth.currentUser && user) {
                return <Redirect to='/' />
              } else {
                return <ResetPassword />
              }
            }} />
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
      </>
    </Router>
  );
}