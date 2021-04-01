import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { Home, Whatshot, VideoLibrary, History } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getSidebar } from '../../redux/selectors/sidebar';
import { toggleSidebar } from '../../redux/actions/sidebar';

export default function Layout({ children }) {
    const sidebar = useSelector(getSidebar);
    const dispatch = useDispatch();
    const handleToggleSidebar = () => {
        dispatch(toggleSidebar());
    }

    const sideBarContainer = (<>
        <Sidebar sidebar={sidebar} Icon={Home} type={'Home'} />
        <Sidebar sidebar={sidebar} Icon={Whatshot} type={'Trending'} />
        <Sidebar sidebar={sidebar} Icon={VideoLibrary} type={'Library'} />
        <Sidebar sidebar={sidebar} Icon={History} type={'History'} />
    </>);

    return (
        <div>
            <Header handleToggleSidebar={handleToggleSidebar} sidebar={sidebar} />
            <div className='sideContainer'>
                <div className={sidebar ? 'open' : 'close'}>
                    {sideBarContainer}
                </div>
            </div>
            {children}
        </div>
    )
}