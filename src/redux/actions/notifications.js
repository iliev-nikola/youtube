import { db } from "../../firebase";
export const SHOW_NOTIFICATIONS = 'SHOW_NOTIFICATIONS';
export const UPDATE_NOTIFICATIONS = 'UPDATE_NOTIFICATIONS';

export const showNotifications = (notifications) => ({
    type: SHOW_NOTIFICATIONS,
    payload: notifications
});

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
