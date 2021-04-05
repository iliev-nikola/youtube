import { db } from "../../firebase";
export const SHOW_COMMENTS = 'SHOW_COMMENTS';

export const showComments = (comments) => ({
    type: SHOW_COMMENTS,
    payload: comments
});

export const getComments = (id) => {
    return function (dispatch) {
        db.collection('comments').where("videoID", "==", id).orderBy("timestamp", "desc").onSnapshot(snapshot => {
            let dbComments = [];
            snapshot.docs.map(doc => (dbComments.push({ ...doc.data() })))
            dispatch(showComments(dbComments));
        });
    }
}
