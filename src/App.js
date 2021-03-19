import React from "react";
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


export default function App() {
  return (
    <Router>
      <>
        <Switch>
          <Route path="/">
            <Header />
            <Slidebar Icon={HomeIcon} type={'Home'} />
            <Slidebar Icon={WhatshotIcon} type={'Trending'} />
            <Slidebar Icon={VideoLibraryIcon} type={'Library'} />
            <Slidebar Icon={HistoryIcon} type={'History'} />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

