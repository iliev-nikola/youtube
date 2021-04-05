import Header from '../Header/Header';
import { Home, VideoLibrary, History } from '@material-ui/icons';
import { Tooltip } from '@material-ui/core';
import styles from './Layout.module.scss';
export default function Layout({ children }) {
    const sideBarContainer = (<>
        <Tooltip title='Home' placement="right">
            <div className={styles.sidebars}>
                <Home />
            </div>
        </Tooltip>
        <Tooltip title='Library' placement="right">
            <div className={styles.sidebars}>
                <VideoLibrary />
            </div>
        </Tooltip>
        <Tooltip title='History' placement="right">
            <div className={styles.sidebars}>
                <History />
            </div>
        </Tooltip>
    </>);
    return (
        <>
            <Header />
            <div className={styles.mainContainer}>
                <div className={styles.sideBarContainer}>
                    {sideBarContainer}
                </div>
                <div className={styles.videosContainer}>
                    {children}
                </div>
            </div>
        </>
    )
}