import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import VideoCard from '../VideoCard/VideoCard';
import styles from './UserProfile.module.scss';

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
        paddingLeft: '150px',
    }
}));

export default function ScrollableTabsButtonAuto({ videos, history, liked }) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
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
                    <Tab label="My videos" {...a11yProps(0)} />
                    <Tab label="History" {...a11yProps(1)} />
                    <Tab label="Liked" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} className={classes.container}>
                {videos.map(video => (
                    <a href={`/video/${video.id}`} className='link' key={video.id}>
                        <div >
                            <VideoCard url={video.url} title={video.title} author={video.artist} duration={video.duration} />
                        </div>
                    </a>
                ))}
            </TabPanel>
            <TabPanel value={value} index={1} className={classes.container}>
                {history.map(video => (
                    <a href={`/video/${video.id}`} className='link' key={video.id}>
                        <div >
                            <VideoCard url={video.url} title={video.title} author={video.artist} duration={video.duration} />
                        </div>
                    </a>
                ))}
            </TabPanel>
            <TabPanel value={value} index={2} className={classes.container}>
                {liked.map(video => (
                    <a href={`/video/${video.id}`} className='link' key={video.id}>
                        <div >
                            <VideoCard url={video.url} title={video.title} author={video.artist} duration={video.duration} />
                        </div>
                    </a>
                ))}
            </TabPanel>
            <TabPanel value={value} index={3}>
                Item Four
      </TabPanel>
            <TabPanel value={value} index={4}>
                Item Five
      </TabPanel>
            <TabPanel value={value} index={5}>
                Item Six
      </TabPanel>
            <TabPanel value={value} index={6}>
                Item Seven
      </TabPanel>
        </div>
    );
}
