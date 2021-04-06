import { AccountCircle as AccountCircleIcon } from '@material-ui/icons';
import styles from './GuestHeader.module.scss';

export default function GuestHeader() {
    return (
        <div>
            <a href='/signin' className={styles.links} title='Sign in'>
                <div className={styles.signIn}>
                    <AccountCircleIcon />
                    <span>SIGN IN</span>
                </div>
            </a>
        </div>
    )
}