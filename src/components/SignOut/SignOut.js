import { signOut } from '../../utils';
import { useHistory } from "react-router-dom";

export default function SignOut() {
    const history = useHistory();
    signOut();
    history.push('/');
    return null;
}
