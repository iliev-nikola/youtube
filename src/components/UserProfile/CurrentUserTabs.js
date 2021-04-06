import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import VideoCard from '../VideoCard/VideoCard';
import styles from './UserProfile.module.scss';
import AlertDialog from './DialogBoxes/AlertDialog';
import FormDialog from './DialogBoxes/FormDialog';
import { AppBar, Tabs, Tab, Box } from '@material-ui/core';
import { editIt, deleteIt, fetchMyVideos } from '../../redux/actions/videos';
import { useDispatch, useSelector } from 'react-redux';
import { getMyVideos } from '../../redux/selectors/videos';

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

export default function ScrollableTabsButtonAuto({ history, liked, user, currentUser }) {
    const [video, setVideo] = useState(null);
    const [value, setValue] = useState(0);
    const [openAlert, setOpenAlert] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();
    const myVideos = useSelector(getMyVideos);

    useEffect(() => {
        dispatch(fetchMyVideos(user.uid));
    }, [dispatch, user]);

    const onEditOpen = (video) => {
        setOpenEdit(true);
        setVideo(video);
    };
    const onDeleteOpen = (video) => {
        setOpenAlert(true);
        setVideo(video);
    };
    const onEditClick = (title, description) => {
        setOpenEdit(false);
        dispatch(editIt(video, title, description));
    };
    const onDeleteClick = () => {
        setOpenAlert(false);
        dispatch(deleteIt(video, user.uid));
    };
    const handleCloseEdit = () => {
        setOpenEdit(false);
    };
    const handleCloseAlert = () => {
        setOpenAlert(false);
    };
    const handleChange = (e, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    className={classes.tabBar}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    <Tab label="Videos" {...a11yProps(0)} />
                    {history ? <Tab label="History" {...a11yProps(1)} /> : null}
                    <Tab label="Liked" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} className={classes.container}>
                {myVideos && myVideos.length ? myVideos.map(video => (
                    <div key={video.id}>
                        <VideoCard url={video.url} title={video.title} author={video.author} authorPhotoURL={video.authorPhotoURL} id={video.id} duration={video.duration} />
                        {user.uid === currentUser.uid ?
                            <div className={styles.optionsContainer}>
                                <p id={styles.editButton} onClick={() => onEditOpen(video)}>Edit</p>
                                <p id={styles.deleteButton} onClick={() => onDeleteOpen(video)}>Delete</p>
                            </div> : null}
                    </div>
                )) : <h1 className={styles.emptyContainerTitle}>No videos added yet</h1>}
            </TabPanel>
            {history ?
                <TabPanel value={value} index={1} className={classes.container}>
                    {history.length ? history.map(video => (
                        <div >
                            <VideoCard url={video.url} title={video.title} author={video.author} authorPhotoURL={video.authorPhotoURL} id={video.id} duration={video.duration} />
                        </div>
                    )) : <h1 className={styles.emptyContainerTitle}>Your history is empty</h1>}
                </TabPanel> : null}
            <TabPanel value={value} index={2} className={classes.container}>
                {liked && liked.length ? liked.map(video => (
                    <div >
                        <VideoCard url={video.url} title={video.title} author={video.author} authorPhotoURL={video.authorPhotoURL} id={video.id} duration={video.duration} />
                    </div>
                )) : <h1 className={styles.emptyContainerTitle}>Like some videos first</h1>}
            </TabPanel>
            <FormDialog handleClose={handleCloseEdit} onEditClick={onEditClick} open={openEdit} video={video} />
            <AlertDialog handleClose={handleCloseAlert} onDeleteClick={onDeleteClick} open={openAlert} video={video} />
        </div>
    );
}
