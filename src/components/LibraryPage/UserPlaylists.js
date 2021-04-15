// react
import React, { useEffect, useState } from 'react';
import styles from './Playlists.module.scss';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { getUser, getUserLoading } from '../../redux/selectors/user';
// components
import { AppBar, Box, Tab, Tabs } from '@material-ui/core';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import VideoCard from '../VideoCard/VideoCard';
import Layout from '../Layout/Layout';
import GuestHeader from '../common/GuestHeader/GuestHeader';
import { getUserPlaylists } from '../../service/service';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} className={styles.container}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  tabBar: {
    backgroundColor: '#202020',
    color: 'white',
    paddingLeft: '150px'
  },
  container: {
    paddingLeft: '50px',
  }
}));

export default function UserPlaylists() {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const isUserLoading = useSelector(getUserLoading);
  const [playlists, setPlaylists] = useState([]);
  const classes = useStyles();

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
              value={0}
              variant="scrollable"
              scrollButtons="auto"
            // className={classes.tabBar}
            >

              {playlist.videos.length ? playlist.videos.map(video => (
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