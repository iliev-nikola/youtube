import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import { useSelector } from 'react-redux';
import VideoCart from '../VideoCard/VideoCard';
import Layout from '../Layout/Layout';
import styles from './Playlists.module.scss';

export default function UserPlaylists() {
  const playlists = useSelector(state => state.playlist.playlists);
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
        )) : null};
      </div>
    </Layout >
  );
}