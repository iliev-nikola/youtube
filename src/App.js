import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import './App.css';
import './Reset.css';
import { isLoggedIn } from './utils';
import Header from './Components/Header/Header';
import Slidebar from './Components/Slidebar/Slidebar';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import HistoryIcon from '@material-ui/icons/History';
import SignUp from './Components/SignUp/SignUp';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import VideoCard from './Components/VideoCard/VideoCard';
import videos from './videos';
import OpenVideo from './Components/OpenVideo/OpenVideo';
import SignIn from "./Components/SignIn/SignIn";
import ResetPassword from './Components/ResetPassword/ResetPassword';
import SignOut from "./Components/SignOut/SignOut";


export default function App() {
  const [slidebar, toggleSlidebar] = useState(false);
  const handleToggerSlidebar = () => toggleSlidebar(value => !value);
  const header = <><Header handleToggerSlidebar={handleToggerSlidebar} slidebar={slidebar} /></>;
  const slideBar = <>
    <Slidebar slidebar={slidebar} Icon={HomeIcon} type={'Home'} />
    <Slidebar slidebar={slidebar} Icon={WhatshotIcon} type={'Trending'} />
    <Slidebar slidebar={slidebar} Icon={VideoLibraryIcon} type={'Library'} />
    <Slidebar slidebar={slidebar} Icon={HistoryIcon} type={'History'} />
  </>

  return (
    <Router>
      <>
        <Switch>
          <Route exact path="/">
            {header}
            <div className='mainContainer'>
              <div className={slidebar ? 'open' : 'close'}>
                {slideBar}
              </div>
              <div className='videoContainer'>
                {videos.map(video => (
                  <Link to={`/video/${video.id}`} className='link' key={video.id}>
                    <div >
                      <VideoCard url={video.url} title={video.title} author={video.author} duration={video.duration} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Route>
          <Route path="/video/:id">
            {header}
            <div className={slidebar ? 'open' : 'notVisible'}>
              {slideBar}
            </div>
            <OpenVideo />
          </Route>
          <Route path="/upload">
          </Route>
          <Route path="/signup">
            {!isLoggedIn() ? <SignUp /> : <Redirect to="/" />}
          </Route>
          <Route path="/signout">
            {isLoggedIn() ? <SignOut /> : <Redirect to="/" />}
          </Route>
          <Route path="/signin">
            {!isLoggedIn() ? <SignIn /> : <Redirect to="/" />}
          </Route>
          <Route path="/reset">
            {!isLoggedIn() ? <ResetPassword /> : <Redirect to="/" />}
          </Route>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

