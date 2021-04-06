import Header from '../Header/Header';
import { Home, VideoLibrary, History, Whatshot } from '@material-ui/icons';
import { Tooltip } from '@material-ui/core';
import styles from './Layout.module.scss';
export default function Layout({ children }) {
    const sideBarContainer = (<>
        <Tooltip title='Home' placement="right">
            <a href="/" className={styles.sidebars}>
                <Home />
                <p>Home</p>
            </a>
        </Tooltip>
        <Tooltip title='Library' placement="right">
            <a href="/library" className={styles.sidebars}>
                <VideoLibrary />
                <p>Library</p>
            </a>
        </Tooltip>
        <Tooltip title='History' placement="right">
            <a href="/history" className={styles.sidebars}>
                <History />
                <p>Library</p>
            </a>
        </Tooltip>
        <Tooltip title='Trending' placement="right">
            <a href="/trending" className={styles.sidebars}>
                <Whatshot />
                <p>Trending</p>
            </a>
        </Tooltip>
    </>);
    return (
        <>
            <Header />
            <div className={styles.mainContainer}>
                <div className={styles.sideBarContainer}>
                    {sideBarContainer}
                </div>
                <div className={styles.homeContainer}>
                    {children}
                </div>
            </div>
        </>
    )
}