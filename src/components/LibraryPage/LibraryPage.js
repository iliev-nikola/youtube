import React, { useEffect, useState } from 'react';
import styles from './LibraryPage.module.scss';
// // redux
import { useDispatch, useSelector } from 'react-redux';
import { getUser, getUserLoading } from '../../redux/selectors/selectors';
// // components
// import { AppBar, Tabs } from '@material-ui/core';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import VideoCard from '../VideoCard/VideoCard';
import Layout from '../Layout/Layout';
// import Tab from '@material-ui/core/Tab';
import GuestHeader from '../common/GuestHeader/GuestHeader';
import { getUserPlaylists } from '../../service/service';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

export default function LibraryPage() {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const isUserLoading = useSelector(getUserLoading);
  const [playlists, setPlaylists] = useState([]);

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
                className={styles.welcomeText}
              >
                {playlist.videos.length ? playlist.videos.map((video, index) => (
                  <Tab className={styles.cont} label={
                    <VideoCard url={video.url} title={video.title} key={video.id} views={video.views}
                      author={video.author} authorPhotoURL={video.authorPhotoURL}/>} {...a11yProps(index)} />
                )) : <Tab  label="The playlist is empty..." {...a11yProps(0)}/>}
              </Tabs>
            </AppBar>
          )) : emptyPlaylistPage}
        </div>)}
        {!isUserLoading && !user && noLoggedInUserPage}
    </Layout>
  );
}