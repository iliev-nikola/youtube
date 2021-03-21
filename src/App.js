/* eslint-disable no-undef */
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Header from './components/Header/Header';
import Slidebar from './components/Slidebar/Slidebar';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import HistoryIcon from '@material-ui/icons/History';
import SignUp from './components/SignUp/SignUp';
import ErrorPage from './components/errorPage/errorPage';
import VideoCard from './components/VideoCard/VideoCard';
import videos from './videos';


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
                {
                  videos.map(video => (
                    <Link to={video.id} className='link' key={video.id}>
                      <div >
                        <VideoCard url={video.url} title={video.title} author={video.author} />
                      </div>
                    </Link>
                  ))
                }
              </div>
            </div>
          </Route>
          <Route path="/:videoId"></Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

