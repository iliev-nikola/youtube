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
import { getAllVideos, getUser } from './service';
import Search from "./Components/Search/Search";
import UserProfile from "./Components/UserProfile/UserProfile";
import { auth } from "./firebase";
import VoiceControl from './Components/VoiceControl/VoiceControl';
import ProgressBar from "./Components/ProgressBar/ProgressBar";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from './redux/actions/getVideos';
import { setUser } from './redux/actions/user';

export default function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.videos.videos);
  const [sidebar, setSidebar] = useState(false);
  const user = useSelector(getUser);
  // const [user, setUser] = useState(null);
  // const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(setUser(null));
      }
    })
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchVideos());
    if (videos.length) {
      setLoading(false);
    }
  }, [videos, dispatch]);

  // CHECK IF LOGGED IN
  // useEffect(() => {
  //   auth.onAuthStateChanged(user => {
  //     if (user) {
  //       setUser(user);
  //     } else {
  //       setUser(null);
  //     }
  //   });
  // });

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


  // const fetchMoreData = () => {
  //   getAllVideos().then((result) => setVideos(videos.concat(result)))
  // };

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
                  <Link to={`/video/${video.id}`} className='link' key={video.id}>
                    <div>
                      <VideoCard url={video.info.url} title={video.info.title} views={video.info.views} />
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