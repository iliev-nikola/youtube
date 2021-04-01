import { signOut } from '../../utils';
import { useHistory } from "react-router-dom";
import { auth } from '../../firebase';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/user';

export default function SignOut() {
    const dispatch = useDispatch();
    const history = useHistory();
    auth.signOut();
    dispatch(logout());
    history.push('/');
    return null;
}
