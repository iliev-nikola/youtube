import { db } from "../../firebase";

export const SHOW_PLAYLISTS = 'SHOW_PLAYLISTS';

const showPlaylists = (playlists) => ({
    type: SHOW_PLAYLISTS,
    payload: playlists
})

export const getPlaylists = (user) => {
    return function (dispatch) {
        db.collection('playlists').where("userID", "==", user.uid).onSnapshot(snapshot => {
            let dbComments = [];
            snapshot.docs.map(doc => (dbComments.push({ ...doc.data() })))
            dispatch(showPlaylists(dbComments));
        });
    }
}