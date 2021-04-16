// react
import { useEffect, useState } from 'react';
import styles from './LibraryPage.module.scss';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { getUser, getUserLoading } from '../../redux/selectors/selectors';
// components
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import VideoCard from '../VideoCard/VideoCard';
import Layout from '../Layout/Layout';
import GuestHeader from '../common/GuestHeader/GuestHeader';
import { getUserPlaylists } from '../../service/service';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles({
  root: {
    padding: '0',
    overflow: 'auto',
    fontSize: 'inherit',
    maxWidth: 'none',
    textAlign: 'left',
    lineHeight: 'initial',
    whiteSpace: 'initial',
    letterSpacing: 'initial',
    textTransform: 'initial',
    fontWeight: 'initial',
    color: 'white',
  },
  label: {
    color: 'white'
  }
});

export default function LibraryPage() {
  const classes = useStyles();
  const [playlists, setPlaylists] = useState([]);
  const user = useSelector(getUser);
  const isUserLoading = useSelector(getUserLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getUserPlaylists(user.uid)).then(res => setPlaylists(res));
    }
  }, [user]);

  const emptyPlaylistPage = (
    <div className={styles.emptyPage}>
      <VideoLibraryIcon />
      <h2>Your library is empty for now</h2>
      <h2>Enjoy your favorite videos</h2>
      <h5>Go and find whatever you like</h5>
    </div>
  );

  const noLoggedInUserPage = (
    <div className={styles.emptyPage}>
      <VideoLibraryIcon />
      <h2>Enjoy your favorite videos!</h2>
      <h5>Sign in to access videos that you've liked or saved</h5>
      <div className={styles.signIn} > <GuestHeader /></div>
    </div>
  );

  return (
    <Layout>
      {isUserLoading && <h1 className={styles.welcomeText}>Loading...</h1>}
      {user && (<div className={styles.playlistsContainer}>
        {playlists ? playlists.map((playlist, index) => (
          <AppBar position="static" color="default" key={playlist.id}>
            <div className={styles.playlistName}>{playlist.name.toUpperCase()}</div>
            <Tabs
              value={false}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
              key={playlist.id}
            >
              {playlist.videos.length ? playlist.videos.map((video, index) => (
                <Tab
                  classes={{
                    root: classes.root
                  }}
                  key={video.id}
                  label={
                    <VideoCard url={video.url} title={video.title} key={video.id} views={video.views}
                      author={video.author} authorPhotoURL={video.authorPhotoURL} id={video.id} />} {...a11yProps(index)} />
              )) : <Tab className={classes.label} label="The playlist is empty..." {...a11yProps(0)} />}
            </Tabs>
          </AppBar>
        )) : emptyPlaylistPage}
      </div>)}
      {!isUserLoading && !user && noLoggedInUserPage}
    </Layout>
  );
}