import { db } from "../../firebase";
import firebase from "firebase/app";
export const SHOW_NOTIFICATIONS = 'SHOW_NOTIFICATIONS';
export const UPDATE_NOTIFICATIONS = 'UPDATE_NOTIFICATIONS';

export const showNotifications = (notifications) => ({
    type: SHOW_NOTIFICATIONS,
    payload: notifications
});

export const updateNotifications = (notifications) => ({
    type: UPDATE_NOTIFICATIONS,
    payload: notifications
})

export const getNotifications = (userID) => {
    return function (dispatch) {
        db.collection("notifications")
            .where("userID", "==", userID)
            .onSnapshot((notifications) => {
                let dbNot = [];
                notifications.forEach((noti) => {
                    dbNot.push(noti.data());
                });
                dispatch(showNotifications(dbNot));
            })
    }
}

export const showUpdatedNotifications = (video, user, currentStatus) => {
    return function () {
        const notificationsData = {
            videoID: video.id,
            status: currentStatus,
            userID: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }
        db.collection('notifications').doc().set(notificationsData)
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