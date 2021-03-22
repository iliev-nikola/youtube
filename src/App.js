import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import './App.css';
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

  return (
    <Router>
      <>
        <Switch>
          <Route exact path="/">
            <Header handleToggerSlidebar={handleToggerSlidebar} slidebar={slidebar} />
            <div className='mainContainer'>
              <div className={slidebar ? 'open' : 'close'}>
                <Slidebar slidebar={slidebar} Icon={HomeIcon} type={'Home'} />
                <Slidebar slidebar={slidebar} Icon={WhatshotIcon} type={'Trending'} />
                <Slidebar slidebar={slidebar} Icon={VideoLibraryIcon} type={'Library'} />
                <Slidebar slidebar={slidebar} Icon={HistoryIcon} type={'History'} />
              </div>
              <div className='videoContainer'>
                {videos.map(video => (
                  <Link to={`/video/${video.id}`} className='link' key={video.id}>
                    <div >
                      <VideoCard url={video.url} title={video.title} author={video.author} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Route>
          <Route path="/video/:id">
            <Header handleToggerSlidebar={handleToggerSlidebar} slidebar={slidebar} />
            <div className={slidebar ? 'open' : 'notVisible'}>
              <Slidebar slidebar={slidebar} Icon={HomeIcon} type={'Home'} />
              <Slidebar slidebar={slidebar} Icon={WhatshotIcon} type={'Trending'} />
              <Slidebar slidebar={slidebar} Icon={VideoLibraryIcon} type={'Library'} />
              <Slidebar slidebar={slidebar} Icon={HistoryIcon} type={'History'} />
            </div>
            <OpenVideo />
          </Route>
          <Route path="/signout">
            {/* {isLoggedIn() ? <SignOut /> : <Redirect to="/" />} */}
            <SignOut />
          </Route>
          {/* {isLoggedIn() ? <Redirect to='/' /> : null} */}
          <Route path="/signup">
            {/* {!isLoggedIn() ? <SignUp /> : <Redirect to="/" />} */}
            <SignUp />
          </Route>
          <Route path="/signin">
            {/* {!isLoggedIn() ? <SignIn /> : <Redirect to="/" />} */}
            <SignIn />
          </Route>
          <Route path="/reset">
            {/* {!isLoggedIn() ? <ResetPassword /> : <Redirect to="/" />} */}
            <ResetPassword />
          </Route>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

