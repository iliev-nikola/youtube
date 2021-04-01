import { auth, db } from '../../firebase';
import { setLoading, setNotLoading } from '../actions/loadingBar';
export const FETCH_VIDEOS_SUCCEEDED = 'FETCH_VIDEOS_SUCCEEDED';
export const FETCH_VIDEOS_REQUESTED = 'FETCH_VIDEOS_REQUESTED';
export const UPDATE_VIDEO = 'UPDATE_VIDEO';
export const VIEWS_VIDEO = 'VIEWS_VIDEO';

export const fetchVideosRequested = () => ({
    type: FETCH_VIDEOS_REQUESTED,
});

export const fetchVideosSucceded = (videos) => ({
    type: FETCH_VIDEOS_SUCCEEDED,
    payload: videos,
});

export const updateVideo = (video) => ({
    type: UPDATE_VIDEO,
    payload: video,
});

export const fetchVideos = () => {
    return function (dispatch) {
        dispatch(setLoading());
        dispatch(fetchVideosRequested());
        db.collection('videos').onSnapshot(snapshot => {
            let dbVideos = [];
            snapshot.docs.map(doc => (dbVideos.push({ ...doc.data() })))
            dispatch(fetchVideosSucceded(dbVideos));
            dispatch(setNotLoading());
        });
    }
};

export const likeIt = (video, id) => {
    return function (dispatch) {
        const currentUser = auth.currentUser.uid;
        const isLiked = video.isLikedBy.find(user => user === currentUser);
        const isDisliked = video.isDislikedBy.find(user => user === currentUser);
        let currentVideo;
        if (isLiked && !isDisliked) {
            return;
        }
        if (!isLiked && isDisliked) {
            const filterLikes = video.isLikedBy.filter(user => user !== currentUser);
            db.collection('videos').doc(id).update({ isDislikedBy: filterLikes })
            db.collection('videos').doc(id).update({ isLikedBy: [...video.isLikedBy, currentUser] })
                .then(() => currentVideo = { ...video, isLikedBy: [...video.isLikedBy, currentUser], filterLikes });
        }
        if (!isLiked) {
            db.collection('videos').doc(id).update({ isLikedBy: [...video.isLikedBy, currentUser] })
                .then(() => currentVideo = { ...video, isLikedBy: [...video.isLikedBy, currentUser] });
            currentVideo = { ...video, isLikedBy: [...video.isLikedBy, currentUser] };
        }
        dispatch(updateVideo(currentVideo));
    }
};

export const dislikeIt = (video, id) => {
    return function (dispatch) {
        const currentUser = auth.currentUser.uid;
        const isLiked = video.isLikedBy.find(user => user === currentUser);
        const isDisliked = video.isDislikedBy.find(user => user === currentUser);
        let currentVideo;
        if (isDisliked && !isLiked) {
            return;
        }
        if (!isDisliked) {
            db.collection('videos').doc(id).update({ isDislikedBy: [...video.isDislikedBy, currentUser] })
                .then(() => currentVideo = { ...video, isDislikedBy: [...video.isDislikedBy, currentUser] });
            currentVideo = { ...video, isLikedBy: [...video.isLikedBy, currentUser] };
        }
        if (!isDisliked && isLiked) {
            const filterLikes = video.isLikedBy.filter(user => user !== currentUser);
            db.collection('videos').doc(id).update({ isLikedBy: filterLikes })
            db.collection('videos').doc(id).update({ isDislikedBy: [...video.isDislikedBy, currentUser] })
                .then(() => currentVideo = { ...video, filterLikes, isDislikedBy: [...video.isDislikedBy, currentUser] });
        }
        dispatch(updateVideo(currentVideo));
    }
};

export const changeViews = (video, id, user) => {
    return function () {
        const isWatchedByUser = video.isWatchedBy.some(currentUser => currentUser.id === user.uid);
        db.collection("videos")
            .doc(id)
            .update({ views: video.views + 1 });
        if (!isWatchedByUser) {
            db.collection("videos")
                .doc(id)
                .update({ isWatchedBy: [...video.isWatchedBy, user.uid] });
        }
    }
}
