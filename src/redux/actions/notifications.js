import { db } from "../../firebase";
import firebase from "firebase/app";
import { generateId } from '../../utils';
export const SHOW_NOTIFICATIONS = 'SHOW_NOTIFICATIONS';
export const UPDATE_NOTIFICATIONS = 'UPDATE_NOTIFICATIONS';
export const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION';

export const showNotifications = (notifications) => ({
    type: SHOW_NOTIFICATIONS,
    payload: notifications
});

export const updateNotifications = (notifications) => ({
    type: UPDATE_NOTIFICATIONS,
    payload: notifications
})

export const deleteNotification = (notifications) => ({
    type: DELETE_NOTIFICATION,
    payload: notifications
})

export const getNotifications = (userID) => {
    return function (dispatch) {
        db.collection("notifications")
            .where("userID", "==", userID)
            .orderBy("timestamp", "desc")
            .onSnapshot((notifications) => {
                let dbNot = [];
                notifications.forEach((noti) => {
                    dbNot.push(noti.data());
                });
                dispatch(showNotifications(dbNot));
            })
    }
}

export const updatedNotifications = (video, user, status) => {
    return function (dispatch) {
        const id = generateId();
        const notificationsData = {
            notID: id,
            videoID: video.id,
            videoTitle: video.title,
            status: status,
            userID: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            isRead : false
        }
        db.collection('notifications').doc(id).set(notificationsData)
            .then(() => {
                db.collection("notifications")
                    .where("authorID", "==", user.uid)
                    .get()
                    .then((notifications) => {
                        let dbNotifications = [];
                        notifications.forEach((doc) => {
                            dbNotifications.push(doc.data());
                        });
                    });
            })
    }
}

export const deleteNotif = (id) => {
    return function (dispatch, getState) {
        const allNotif = getState().notification.notifications;
        let filtered = allNotif.filter(notifications => notifications.notID !== id);
        dispatch(showNotifications(filtered));
    }
}