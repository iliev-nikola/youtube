import { db } from './firebase';
import firebase from "firebase/app";
import { generateId } from './utils';

export function getAllVideos() {
}

export function getVideo(id) {
}

export function getUserById(id) {
    db.collection('users').doc(id).get().then(res => console.log(res.docs))
}

export function getUserVideos(arr) {
}

export function pushToWatched(id) {
    // find current user in firebase and push the id in the history array
}

export function pushToLiked(id) {
    // find current user in firebase and push the id in the liked array
}

export function setNotificationsRead() {
    db.collection('notifications').get().then(res => res.docs.map(el => el.data())).then(res => {
        res.forEach(el => {
            db.collection('notifications').doc(el.notID).update({ isRead: true });
        })
    });
}

export function updatedNotifications(video, user, status) {
    const id = generateId();
    const notificationsData = {
        notID: id,
        videoID: video.id,
        videoTitle: video.title,
        status: status,
        userID: video.authorID,
        displayName: user.displayName,
        photoURL: user.photoURL,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        isRead: false
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

export const deleteNotification = (id) => {
    db.collection("notifications").doc(id).delete();
}

export const deleteComment = (id) => {
    db.collection("comments").doc(id).delete();
}