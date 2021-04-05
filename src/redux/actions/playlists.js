import { db } from "../../firebase";

export const SHOW_PLAYLISTS = 'SHOW_PLAYLISTS';

const showPlaylists = (playlists) => ({
    type: SHOW_PLAYLISTS,
    payload: playlists
})

export const getPlaylists = (user) => {
    return function (dispatch) {
        db.collection('playlists').where("authorID", "==", user.uid).onSnapshot(snapshot => {
            const playlists = snapshot.docs.map(doc => ({ ...doc.data() }));
            dispatch(showPlaylists(playlists));
        });
    }
}