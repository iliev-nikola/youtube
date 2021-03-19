/* eslint-disable no-undef */
import React, {useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Header from './components/Header/Header';
import Slidebar from './components/Slidebar/Slidebar';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import HistoryIcon from '@material-ui/icons/History';
import SignUp from './components/SignUp/SignUp';

export default function App() {
  const [slidebar, toggleSlidebar] = useState(false);
  const handleToggerSlidebar = () => toggleSlidebar(value => !value);
  return (
    <Router>
      <>
        <Switch>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/">
            <Header handleToggerSlidebar={handleToggerSlidebar} />
            <Slidebar slidebar={slidebar} Icon={HomeIcon} type={'Home'} />
            <Slidebar slidebar={slidebar}  Icon={WhatshotIcon} type={'Trending'} />
            <Slidebar slidebar={slidebar}  Icon={VideoLibraryIcon} type={'Library'} />
            <Slidebar slidebar={slidebar}  Icon={HistoryIcon} type={'History'} />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

