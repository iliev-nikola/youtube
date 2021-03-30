import { auth } from "../../../firebase";
export const CURRENT_USER = 'CURRENT_USER';

export const getCurrentUser = (user) => ({
    type: CURRENT_USER,
    payload: user
});

export const currUser = () => {
    return function (dispatch, getState) {
        const user = getState().user;
       
        auth.onAuthStateChanged(currUser => {
            if (currUser) {
                dispatch(getCurrentUser(currUser));
                console.log(user);
            }
        })
    }
};