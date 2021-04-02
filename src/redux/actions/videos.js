import { auth, db } from '../../firebase';
import { setLoading, setNotLoading } from '../actions/loadingBar';
import { getVideoWatched, getVideoID, getVideoViews, getVideo } from '../selectors/video';
import { getUser } from '../selectors/user';
export const FETCH_VIDEOS_SUCCEEDED = 'FETCH_VIDEOS_SUCCEEDED';
export const FETCH_VIDEOS_REQUESTED = 'FETCH_VIDEOS_REQUESTED';
export const UPDATE_VIDEO = 'UPDATE_VIDEO';
export const FETCH_VIDEO = 'FETCH_VIDEO';
export const INCREASE_VIEWS = 'INCREASE_VIEWS';
export const INCREASE_LIKES = 'INCREASE_LIKES';

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

export const fetchVideoSucceded = (video) => ({
    type: FETCH_VIDEO,
    payload: video,
});

export const increaseViews = () => ({
    type: INCREASE_VIEWS
})


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

export const likeIt = () => {
    return function (dispatch, getState) {
        const currentUser = auth.currentUser.uid;
        const video = getVideo(getState());
        const isLiked = video.isLikedBy.some(user => user === currentUser);
        const isDisliked = video.isDislikedBy.some(user => user === currentUser);
        let currentVideo = video;
        if (isLiked) {
            return;
        } else if (!isLiked && isDisliked) {
            const filterLikes = video.isLikedBy.filter(user => user !== currentUser);
            db.collection('videos').doc(video.id).update({ isDislikedBy: filterLikes, isLikedBy: [...video.isLikedBy, currentUser] })
                .then(() => currentVideo = { ...video, isLikedBy: [...video.isLikedBy, currentUser], filterLikes });
        } else if (!isLiked) {
            db.collection('videos').doc(video.id).update({ isLikedBy: [...video.isLikedBy, currentUser] })
                .then(() => currentVideo = { ...video, isLikedBy: [...video.isLikedBy, currentUser] });

        }

        dispatch(updateVideo(currentVideo));
    }
};

export const dislikeIt = () => {
    return function (dispatch, getState) {
        const currentUser = auth.currentUser.uid;
        const video = getVideo(getState());
        const isLiked = video.isLikedBy.some(user => user === currentUser);
        const isDisliked = video.isDislikedBy.some(user => user === currentUser);
        let currentVideo = video;
        if (isDisliked) {
            return;
        } else if (!isDisliked && isLiked) {
            const filterLikes = video.isLikedBy.filter(user => user !== currentUser);
            db.collection('videos').doc(video.id).update({ isLikedBy: filterLikes, isDislikedBy: [...video.isDislikedBy, currentUser] })
                .then(() => currentVideo = { ...video, filterLikes, isDislikedBy: [...video.isDislikedBy, currentUser] });
        } else if (!isDisliked) {
            db.collection('videos').doc(video.id).update({ isDislikedBy: [...video.isDislikedBy, currentUser] })
                .then(() => currentVideo = { ...video, isDislikedBy: [...video.isDislikedBy, currentUser] });
        }

        dispatch(updateVideo(currentVideo));
    }
};

export const changeViews = () => {
    return function (dispatch, getState) {
        const user = getUser(getState());
        const isWatchedBy = getVideoWatched(getState());
        const videoID = getVideoID(getState());
        const videoViews = getVideoViews(getState());
        db.collection("videos")
            .doc(videoID)
            .update({ views: videoViews + 1 });
        if (user && !isWatchedBy.includes(user.uid)) {

            db.collection("videos")
                .doc(videoID)
                .update({ isWatchedBy: [...isWatchedBy, user.uid] });
        }
        return dispatch(increaseViews());
    }
}

export const fetchVideo = (id) => {
    return function (dispatch) {
        db.collection("videos")
            .doc(id)
            .get()
            .then(res => dispatch(fetchVideoSucceded(res.data())));
    }
}
