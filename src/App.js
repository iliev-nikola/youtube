import React, { useState, useEffect } from "react";
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
import Slidebar from './Components/Slidebar/Slidebar';
import OpenVideo from './Components/OpenVideo/OpenVideo';
import SignIn from "./Components/SignIn/SignIn";
import ResetPassword from './Components/ResetPassword/ResetPassword';
import SignOut from "./Components/SignOut/SignOut";
import UploadVideo from './Components/UploadVideo/UploadVideo';
import { isLoggedIn } from './utils';
import { getAllVideos } from './service';
import image from './Components/Search/no-search-result.png';
import Search from "./Components/Search/Search";
import UserProfile from "./Components/UserProfile/UserProfile";

export default function App() {
  // CHECK IF LOGGED IN
  // this is not working...
  const [isLogged, setLogged] = useState(null);
  useEffect(() => {
    if (isLoggedIn()) {
      setLogged(true);
    } else {
      setLogged(false);
    }

    return () => {
      setLogged(null);
    };
  }, [isLogged]);

  // videos fetch call
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getAllVideos().then((result) => setVideos(result));
  }, []);

  // HEADER & SLIDEBAR
  const [slidebar, toggleSlidebar] = useState(false);
  const handleToggerSlidebar = () => toggleSlidebar(value => !value);
  const header = <Header handleToggerSlidebar={handleToggerSlidebar} slidebar={slidebar} />;
  const slideBarContainer = (<>
    <Slidebar slidebar={slidebar} Icon={HomeIcon} type={'Home'} />
    <Slidebar slidebar={slidebar} Icon={WhatshotIcon} type={'Trending'} />
    <Slidebar slidebar={slidebar} Icon={VideoLibraryIcon} type={'Library'} />
    <Slidebar slidebar={slidebar} Icon={HistoryIcon} type={'History'} />
  </>)
 
  return (
    <Router>
      <>
        <Switch>
          <Route exact path="/">
            {header}
            <div className='mainContainer'>
              <div className='slideContainer'>
                <div className={slidebar ? 'open' : 'close'}>
                  {slideBarContainer}
                </div>
              </div>
              <div className={!slidebar ? 'videoContainer' : 'notActive'}>
                {videos.length ? videos.map(video => (
                  <Link to={`/video/${video.id}`} className='link' key={video.id}>
                    <div>
                      <VideoCard  url={video.url} title={video.title} author={video.artist} duration={video.duration} />
                    </div>
                  </Link>
                )) : <img src={image} alt='No search results' id='noSearchResImg' />}
              </div>
            </div>
          </Route>
          <Route path="/video/:id">
            {header}

            <div className={slidebar ? 'open' : 'notVisible'}>
              {slideBarContainer}
            </div>
            <OpenVideo slidebar={slidebar} />

          </Route>
          <Route exact path="/search/">
            <Redirect to="/" />
          </Route>
          <Route path="/search/:id">
            {header}
            <Search slidebar={slidebar} slideBarContainer={slideBarContainer} />
          </Route>
          <Route exact path="/upload">
            <UploadVideo />
          </Route>
          <Route path="/user/:id">
            {header}
            <UserProfile slidebar={slidebar} slideBarContainer={slideBarContainer} />
          </Route>
          <Route exact path="/signout">
            {/* {isLogged ? <SignOut /> : <Redirect to="/" />} */}
            <SignOut />
          </Route>
          <Route exact path="/signup">
            {!isLogged ? <SignUp /> : <Redirect to="/" />}
            {/* <SignUp /> */}
          </Route>
          <Route exact path="/signin">
            {!isLogged ? <SignIn /> : <Redirect to="/" />}
            {/* <SignIn /> */}
          </Route>
          <Route exact path="/reset">
            {!isLogged ? <ResetPassword /> : <Redirect to="/" />}
            {/* <ResetPassword /> */}
          </Route>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
      </>
    </Router>
  );
}