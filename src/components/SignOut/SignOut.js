import { signOut } from '../../utils';
import { Redirect, useHistory } from "react-router-dom";

export default function SignOut() {
    const history = useHistory();
    signOut();
    history.push('/');
    // return <Redirect to="/" />
    return null;
}
