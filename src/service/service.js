import { db } from './firebase';
import firebase from 'firebase/app';
import { generateId } from '../utils';

// NOTIFICATIONS
export function setNotificationsRead() {
    db.collection('notifications')
        .get()
        .then(res => res.docs.map(el => el.data()))
        .then(res => {
            res.forEach(el => {
                db.collection('notifications').doc(el.notID).update({ isRead: true });
            });
        })
        .catch(err => console.log('error', err.message));
}

export function updateNotifications(video, user, status) {
    const id = generateId();
    const now = Date.now();
    const notificationsData = {
        notID: id,
        videoID: video.id,
        videoTitle: video.title,
        status: status,
        userID: video.authorID,
        displayName: user.displayName,
        photoURL: user.photoURL,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        time: now,
        isRead: false
    }
    db.collection('notifications').doc(id).set(notificationsData)
        .catch(err => console.log('error', err.message));
}

export const deleteNotification = (id) => {
    db.collection('notifications').doc(id).delete();
};

export function deleteNotificationsOlderThanTwoHours() {
    const ref = db.collection('notifications');
    const now = Date.now();
    const cutoff = now - 2 * 60 * 60 * 1000;
    ref.orderBy('time').endAt(cutoff).limitToLast(1).get()
        .then(res => res.docs.map(el => el.data()))
        .then(res => res.forEach(doc => {
            if (doc.isRead) {
                ref.doc(doc.notID).delete();
            }
        }))
        .catch(err => console.log(err));
}

// COMMENTS
export function createComments(videoID, user, inputValue) {
    const id = generateId();
    const commentData = {
        commentID: id,
        videoID: videoID,
        comment: inputValue,
        userID: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        isEdit: false
    }
    db.collection('comments').doc(id).set(commentData)
        .catch(err => console.log('error', err.message));
}

export function deleteComment(id) {
    db.collection('comments').doc(id).delete();
}

export function updateComment(id, value) {
    db.collection('comments').doc(id).update({ comment: value, isEdit: false });
}

export function editableComment(id) {
    db.collection('comments').doc(id).update({ isEdit: true });
}

export function uneditableComment(id) {
    db.collection('comments').doc(id).update({ isEdit: false });
}

// PLAYLISTS
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
        .catch(err => console.log('error', err.message));
};

export const addVideoToPlaylist = (video, id) => {
    db.collection('playlists')
        .doc(id)
        .update({
            videos: firebase.firestore.FieldValue.arrayUnion(video)
        })
        .catch(err => console.log('error', err.message));
};

export const removeVideoFromPlaylist = (video, id) => {
    db.collection('playlists')
        .doc(id)
        .update({
            videos: firebase.firestore.FieldValue.arrayRemove(video)
        })
        .catch(err => console.log('error', err.message));
};

export const deletePlaylist = (id) => {
    db.collection('playlists').doc(id).delete();
};

// VIDEOS
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
            .catch(err => console.log('error', err.message));
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
            .catch(err => console.log('error', err.message));
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

export function likeOrDislikeVideo(user, video) {
    if (!user) {
        return;
    }
    const isLiked = video.isLikedBy.some(id => id === user.uid);
    if (isLiked) {
        const filterLikes = video.isLikedBy.filter(id => id !== user.uid);
        db.collection('videos').doc(video.id).update({ isLikedBy: filterLikes, isDislikedBy: [...video.isDislikedBy, user.uid] })
        updateNotifications(video, user, 'like');
    } else {
        const filterDislikes = video.isDislikedBy.filter(id => id !== user.uid);
        db.collection('videos').doc(video.id).update({ isDislikedBy: filterDislikes, isLikedBy: [...video.isLikedBy, user.uid] })
        updateNotifications(video, user, 'dislike');
    }
}

// THEME
export function updateUserTheme(user, theme) {
    db.collection('users').doc(user.uid).update({ theme: theme })
}

// USER
export function getCurrentUserInfo(id) {
    return db.collection('users').doc(id).get().then(res => res);
}

export function getCurrentUserHistory(id) {
    const videosRef = db.collection('videos');
    return videosRef.where('isWatchedBy', 'array-contains', id).get().then(res => res.docs.map(el => el.data()));
}

export function getCurrentUserLiked(id) {
    const videosRef = db.collection('videos');
    return videosRef.where('isLikedBy', 'array-contains', id).get().then(res => res.docs.map(el => el.data()));
}

// SUBSCRIBES
export function subscribe(user, video) {
    db.collection('users')
        .doc(user.uid)
        .update({
            subscribes: firebase.firestore.FieldValue.arrayUnion(video.authorID)
        });
}

export function unsubscribe(user, video) {
    db.collection('users')
        .doc(user.uid)
        .update({
            subscribes: firebase.firestore.FieldValue.arrayRemove(video.authorID)
        });
}