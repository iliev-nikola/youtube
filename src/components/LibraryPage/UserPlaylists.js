// react
import React, { useEffect, useState } from 'react';
import styles from './Playlists.module.scss';
// service
import { getUserPlaylists } from '../../service/service';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { getUser, getUserLoading } from '../../redux/selectors/user';
// components
import { AppBar, Tabs } from '@material-ui/core';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import VideoCard from '../VideoCard/VideoCard';
import Layout from '../Layout/Layout';
import GuestHeader from '../common/GuestHeader/GuestHeader';

export default function UserPlaylists() {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const isUserLoading = useSelector(getUserLoading);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (user) {
      dispatch(getUserPlaylists(user.uid)).then(res => setPlaylists(res));
    }
  }, [user])

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
        {playlists.length ? playlists.map((playlist, index) => (
          <AppBar position="static" color="default" key={playlist.id} >
            <div className={styles.playlistName}>{playlist.name.toUpperCase()}</div>
            <Tabs
              value={false}
              variant="scrollable"
              scrollButtons="auto"
            >
              {playlist.videos.length ? playlist.videos.map((video, index) => (
                <VideoCard url={video.url} title={video.title} key={video.id} views={video.views} author={video.author} authorPhotoURL={video.authorPhotoURL} id={video.id} />
              )) : <p className={styles.welcomeText}>The playlist is empty...</p>}
            </Tabs>
          </AppBar>
        )) : emptyPlaylistPage}
      </div>)}
      {!isUserLoading && !user && noLoggedInUserPage}
    </Layout >
  );
}