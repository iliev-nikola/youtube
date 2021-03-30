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
import image from './Components/Search/no-search-result.png';
import Search from "./Components/Search/Search";
import UserProfile from "./Components/UserProfile/UserProfile";
import { auth } from "./firebase";
import VoiceControl from './Components/VoiceControl/VoiceControl';
import ProgressBar from "./Components/ProgressBar/ProgressBar";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from './allVideos/allVideos.actions';
import { currUser } from './Components/redux/actions/currentUser.action';
export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.videos.videos);
  const [hasMore, setHasMore] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    dispatch(currUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchVideos());
    if (videos.length) {
      setLoading(false);
    }
  }, [videos, dispatch]);

  // CHECK IF LOGGED IN
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  });

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
                      <VideoCard url={video.info.url} title={video.info.title} duration={video.info.duration} views={video.info.views} />
                    </div>
                  </Link>
                )) : <img src={image} alt='No search results' id='noSearchResImg' />}
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
          <Route exact path="/signout">
            {user ? <SignOut /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/signup">
            {!user ? <SignUp /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/signin">
            {!user ? <SignIn /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/reset">
            {!user ? <ResetPassword /> : <Redirect to="/" />}
          </Route>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
      </>
    </Router>
  );
}