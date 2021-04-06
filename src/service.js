import { db } from './firebase';
import firebase from "firebase/app";
import { generateId } from './utils';
import { setAlertOn } from './redux/actions/alertNotifier';
import { useDispatch } from 'react-redux';

export function getUserById(id) {
    db.collection('users').doc(id).get().then(res => console.log(res.docs))
}

export function setNotificationsRead() {
    db.collection('notifications')
        .get()
        .then(res => res.docs.map(el => el.data()))
        .then(res => {
            res.forEach(el => {
                db.collection('notifications').doc(el.notID).update({ isRead: true });
            })
        })
        .catch(err => setAlertOn('error', err.message));
}

export function createComments(videoID, user, inputValue) {
    const id = generateId();
    const commentData = {
        commentID: id,
        videoID: videoID,
        comment: inputValue,
        userID: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }
    db.collection('comments').doc(id).set(commentData)
        .then(() => {
            db.collection("comments")
                .where("videoID", "==", id)
                .get()
                .then((comments) => {
                    let dbComments = [];
                    comments.forEach((doc) => {
                        dbComments.push(doc.data());
                    });

                })
                .catch(err => setAlertOn('error', err.message));
        })
        .catch(err => setAlertOn('error', err.message));
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
                })
                .catch(err => setAlertOn('error', err.message));
        })
        .catch(err => setAlertOn('error', err.message));
}

export const deleteNotification = (id) => {
    db.collection("notifications").doc(id).delete();
}

export const deleteComment = (id) => {
    db.collection("comments").doc(id).delete();
}

export const createPlaylist = (user, inputValue) => {
    const id = generateId();
    const data = {
        id: id,
        name: inputValue,
        authorID: user.uid,
        videos: []
    };

    db.collection('playlists')
        .doc(id)
        .set(data)
        .catch(err => setAlertOn('error', err.message));
}

export const addVideoToPlaylist = (video, id) => {
    db.collection('playlists')
        .doc(id)
        .update({
            videos: firebase.firestore.FieldValue.arrayUnion(video)
        })
        .catch(err => setAlertOn('error', err.message));
}

export const removeVideoFromPlaylist = (video, id) => {
    db.collection('playlists')
        .doc(id)
        .update({
            videos: firebase.firestore.FieldValue.arrayRemove(video)
        })
        .catch(err => setAlertOn('error', err.message));
}

export const deletePlaylist = (id) => {
    db.collection("playlists").doc(id).delete();
}

export function filterVideos(params) {
    if (!params.length) return null;
    if (params.length === 1) {
        return db.collection('videos').get()
            .then(res => res.docs)
            .then(res => res.map(x => x.data()))
            .then(res => {
                const result = res.filter(el => el.title.toLowerCase().includes(params[0]));
                return result;
            })
            .catch(err => setAlertOn('error', err.message));
    } else {
        return db.collection('videos').get()
            .then(res => res.docs)
            .then(res => res.map(x => x.data()))
            .then(res => {
                let filtered = res;
                params.forEach(word => {
                    if (word !== ' ') {
                        filtered = filtered.filter(el => el.title.toLowerCase().includes(word));
                    }
                });

                return filtered;
            })
            .catch(err => setAlertOn('error', err.message));
    }
}

export function getVideosByTitle(title) {
    if (title) {
        return db.collection('videos').get()
            .then(res => res.docs)
            .then(res => res.map(doc => doc.data()))
            .then(res => res.filter(doc => doc.title.match(title)))
            .then(res => res.map(({ title, id }) => ({ title, id })))
    } else {
        return db.collection('videos').get()
            .then(res => res.docs)
            .then(res => res.map(doc => doc.data()))
            .then(res => res.map(({ title, id }) => ({ title, id })))
    }
}

export function updateUserTheme(user, theme) {
    db.collection('users').doc(user.uid).update({ theme: theme })
}

export function likeVideo(user, video) {
    const isLiked = video.isLikedBy.some(id => id === user.uid);
    const isDisliked = video.isDislikedBy.some(id => id === user.uid);
    if (isLiked) {
        return;
    } else if (!isLiked && isDisliked) {
        const filterLikes = video.isLikedBy.filter(id => id !== user.uid);
        db.collection('videos').doc(video.id).update({ isDislikedBy: filterLikes, isLikedBy: [...video.isLikedBy, user.uid] })
    } else if (!isLiked) {
        db.collection('videos').doc(video.id).update({ isLikedBy: [...video.isLikedBy, user.uid] })

    }
};

export function dislikeVideo(user, video) {
    const isLiked = video.isLikedBy.some(id => id === user.uid);
    const isDisliked = video.isDislikedBy.some(id => id === user.uid);
    if (isDisliked) {
        return;
    } else if (!isDisliked && isLiked) {
        const filterLikes = video.isLikedBy.filter(id => id !== user.uid);
        db.collection('videos').doc(video.id).update({ isLikedBy: filterLikes, isDislikedBy: [...video.isDislikedBy, user.uid] })

    } else if (!isDisliked) {
        db.collection('videos').doc(video.id).update({ isDislikedBy: [...video.isDislikedBy, user.uid] })
    }
};