import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { Home, Whatshot, VideoLibrary, History } from '@material-ui/icons';
import styles from './Layout.module.scss';
export default function Layout({ children }) {
    const sideBarContainer = (<>
        <Sidebar Icon={Home} type={'Home'} />
        <Sidebar Icon={Whatshot} type={'Trending'} />
        <Sidebar Icon={VideoLibrary} type={'Library'} />
        <Sidebar Icon={History} type={'History'} />
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