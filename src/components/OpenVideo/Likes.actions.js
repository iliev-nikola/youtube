import { auth, db } from '../../firebase';
export const VIDEO_LIKES = 'VIDEO_LIKES';
export const VIDEO_DISLIKES = 'VIDEO_DISLIKES';

export const likeVideo = (like) => ({
    type: VIDEO_LIKES,
    payload: like
});

export const dislikeVideo = (like) => ({
    type: VIDEO_DISLIKES,
    payload: like
});

export const likeIt = (video,id) => {
    return function (dispatch, getState) {
        let currentUser = auth.currentUser.uid;
        let userLiked = video.isLikedBy.some(uid => uid === currentUser);
        let userDisliked = video.isDislikedBy.some(uid => uid === currentUser);
        dispatch(likeVideo());
        if (!userLiked) {
            video.isLikedBy.push(currentUser);
            video.likes += 1;
        }
        // db.collection('videos2').doc().update
    
        console.log(userLiked, userDisliked);
        console.log(id);
    }
};
