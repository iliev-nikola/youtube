import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import './App.scss';
import './reset.css';
import SignUp from './Components/SignUp/SignUp';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import VideoCard from './Components/VideoCard/VideoCard';
import OpenVideo from './Components/OpenVideo/OpenVideo';
import SignIn from "./Components/SignIn/SignIn";
import ResetPassword from './Components/ResetPassword/ResetPassword';
import SignOut from "./Components/SignOut/SignOut";
import UploadVideo from './Components/UploadVideo/UploadVideo';
import Search from "./Components/Search/Search";
import UserProfile from "./Components/UserProfile/UserProfile";
import { auth } from "./firebase";
import VoiceControl from './Components/VoiceControl/VoiceControl';
import ProgressBar from "./Components/ProgressBar/ProgressBar";
import { useDispatch, useSelector } from "react-redux";
import { handleDarkMode } from './theme/theme';
import { fetchVideos } from './redux/actions/getVideos';
import { setUser } from './redux/actions/user';
import { getUser } from './redux/selectors/user';
import { getVideos } from './redux/selectors/getVideos';
import { getIsLoading } from "./redux/selectors/loading";

export default function App() {
  // const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const videos = useSelector(getVideos);
  const user = useSelector(getUser);
  const isLoading = useSelector(getIsLoading);
  // const [user, setUser] = useState(null);
  // const [hasMore, setHasMore] = useState(false);
  // useEffect(() => {
  //   dispatch(isLoading);
  // }, [dispatch, isLoading]);

  useEffect(() => {
    dispatch(handleDarkMode());
  }, [dispatch]);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(setUser(null));
      }
    })
  }, [dispatch])



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

  // const stateTheme = useSelector(state => state.theme);
  // console.log(stateTheme);
  // useEffect(() => {
  //   dispatch(handleDarkMode());
  // }, [dispatch, stateTheme])


  return (

    <Router>
      <VoiceControl />
      <>
        <ProgressBar isOn={isLoading} />
        <Switch>
          <Route exact path="/">
            {useEffect(() => {
              dispatch(fetchVideos());
              // if (videos.length) {
              //   dispatch(setNotLoading())
              //   // setLoading(false);
              // }
            }, [])}
            {videos.length ? videos.map(video => (
              <Link to={`/video/${video.id}`} className='link' key={video.id}>
                <div>
                  <VideoCard url={video.info.url} title={video.info.title} views={video.info.views} />
                </div>
              </Link>
            )) : null}
          </Route>
          <Route path="/video/:id" component={OpenVideo} />
          <Route path="/search/:id" component={Search} />
          <Route exact path="/search">
            <Redirect to="/" />
          </Route>
          <Route path="/upload" component={UploadVideo} />
          <Route path="/user/:id" component={UserProfile} />
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
          <Route path="/reset"
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
    </Router >
  );
}