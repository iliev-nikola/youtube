import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import VideoCard from '../VideoCard/VideoCard';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../Layout/Layout';
import styles from './Playlists.module.scss';
import { getPlaylists } from '../../redux/actions/playlists';
import { getUser } from '../../redux/selectors/user';

export default function UserPlaylists() {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  useEffect(() => {
    if (user) {
      dispatch(getPlaylists(user));
    }
  }, [user])
  const playlists = useSelector(state => state.playlist.playlists);
  return (
    <Layout>
      <div className={styles.playlistsContainer}>
        {playlists.length ? playlists.map(playlist => (
          <AppBar position="static" color="default" key={playlist.id} >
            <div className={styles.playlistName}>{playlist.name.toUpperCase()}</div>
            <Tabs
              value={0}
              variant="scrollable"
              scrollButtons="auto"
              key={playlists.id}
            >

              {playlist.videos.length ? playlist.videos.map(video => (
                <VideoCard url={video.url} title={video.title} key={video.id} views={video.views} />
              )) : null}
            </Tabs>
          </AppBar>
        )) : null};
      </div>
    </Layout >
  );
}