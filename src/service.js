import { db } from './firebase';
import { getCurrentUser } from './utils';

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
    db.collection('notifications').get().then(res => res.docs.map(el => el.data())).then(res =>{
        res.forEach(el=>{
            db.collection('notifications').doc(el.notID).update({ isRead : true });
        })
    });
}