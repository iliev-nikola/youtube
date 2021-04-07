
import { getVideoWatched, getVideoID, getVideoViews, getVideo } from '../selectors/video';
import { setLoading, setNotLoading } from '../actions/loadingBar';
import { db } from '../../firebase';
import { fetchMyVideos } from '../actions/videos';
import { getUser } from '../selectors/user';
import { setAlertOn } from './alertNotifier';
export const UPDATE_VIDEO = 'UPDATE_VIDEO';
export const VIEWS_VIDEO = 'VIEWS_VIDEO';
export const FETCH_VIDEO = 'FETCH_VIDEO';
export const INCREASE_VIEWS = 'INCREASE_VIEWS';
export const updateVideo = (video) => ({
    type: UPDATE_VIDEO,
    payload: video,
});

export const updateViews = (video) => ({
    type: VIEWS_VIDEO,
    payload: video
});
export const fetchVideoSucceded = (video) => ({
    type: FETCH_VIDEO,
    payload: video,
});

export const increaseViews = () => ({
    type: INCREASE_VIEWS
})

export const editIt = (video, title, description) => {
    return function (dispatch) {
        dispatch(setLoading());
        const obj = { ...video, title, description }
        db.collection('videos')
            .doc(video.id)
            .update(obj,
                (error) => {
                    if (error) {
                        dispatch(setAlertOn('error', error.message));
                    }
                }).then(() => {
                    dispatch(updateVideo(obj));
                    dispatch(fetchMyVideos(video.authorID));
                    dispatch(setNotLoading());
                    dispatch(setAlertOn('success', 'Video successfully updated'));
                });
    }
};

export const deleteIt = (video, uid) => {
    return function (dispatch, setState) {
        console.log(video);
        dispatch(setLoading());
        db.collection('videos')
            .doc(video.id)
            .delete()
            .then(() => {
                dispatch(fetchMyVideos(uid));
                dispatch(setNotLoading());
                dispatch(setAlertOn('success', 'Video successfully deleted'));
            })
            .catch(err => dispatch(setAlertOn('error', err.message)));
    }
};

export const changeViews = () => {
    return function (dispatch, getState) {
        const isWatchedBy = getVideoWatched(getState());
        const videoID = getVideoID(getState());
        const videoViews = getVideoViews(getState());

        db.collection("videos")
            .doc(videoID)
            .update({ views: videoViews + 1 })
            .catch(err => dispatch(setAlertOn('error', err.message)));

        setTimeout(() => {
            const user = getUser(getState());
            if (user && !isWatchedBy.includes(user.uid)) {
                db.collection("videos")
                    .doc(videoID)
                    .update({ isWatchedBy: [...isWatchedBy, user.uid] })
                    .catch(err => dispatch(setAlertOn('error', err.message)));
            }
        }, 1000);

        return dispatch(increaseViews());
    }
}

export const fetchVideo = (id) => {
    return function (dispatch) {
        db.collection("videos").doc(id)
            .onSnapshot((video) => {
                dispatch(fetchVideoSucceded(video.data()));
            });
    }
}