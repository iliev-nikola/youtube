import './App.css';
import Header from './components/Header/Header';
import Slidebar from './components/Slidebar/Slidebar';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import HistoryIcon from '@material-ui/icons/History';

function App() {
  return (
    <div className="App">
      <Header />
      <Slidebar Icon={HomeIcon} type={'Home'} />
      <Slidebar Icon={WhatshotIcon} type={'Trending'} />
      <Slidebar Icon={VideoLibraryIcon} type={'Library'} />
      <Slidebar Icon={HistoryIcon} type={'History'} />
    </div>
  );
}

export default App;