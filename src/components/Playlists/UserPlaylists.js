import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import { useDispatch, useSelector } from 'react-redux';
import VideoCart from '../VideoCard/VideoCard';
import Layout from '../Layout/Layout';
import styles from './Playlists.module.scss';
import { getPlaylists } from '../../redux/actions/playlists';
import { getUser } from '../../redux/selectors/user';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import GuestHeader from '../common/GuestHeader/GuestHeader';

export default function UserPlaylists() {
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  useEffect(() => {
    if (user) {
      dispatch(getPlaylists(user));
    }
  }, [user])

  const playlists = useSelector(state => state.playlist.playlists);

  const emptyPlaylistPage = (
    <div className={styles.emptyPage}>
      <VideoLibraryIcon />
      <h2>Enjoy your favorite videos</h2>
      <h5>Sign in to access videos that you’ve liked or saved</h5>
      <div className={styles.signIn} > <GuestHeader /></div>
    </div>
  );
  return (
    <Layout>
      <div className={styles.playlistsContainer}>
        {playlists.length ? playlists.map(playlist => (
          <AppBar position="static" color="default" key={playlists.playlistID} >
            <div className={styles.playlistName}>{playlist.playlistName.toUpperCase()}</div>
            <Tabs
              value={0}
              variant="scrollable"
              scrollButtons="auto"
              key={playlists.playlistID}
            >

              {playlist.videos.length ? playlist.videos.map(video => (
                <VideoCart url={video.url} title={video.title} key={video.id} views={video.views} />
              )) : null}
            </Tabs>

          </AppBar>
        )) : <>{emptyPlaylistPage}</>};
      </div>
    </Layout >
  );
}