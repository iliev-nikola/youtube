import { auth, db } from '../../firebase';
export const VIDEO_LIKES = 'VIDEO_LIKES';
export const VIDEO_DISLIKES = 'VIDEO_DISLIKES';

export const likeVideo = (likes) => ({
    type: VIDEO_LIKES,
    payload: likes
});

export const dislikeVideo = (likes) => ({
    type: VIDEO_DISLIKES,
    payload: likes
});

export const likeIt = (video, id) => {
    return function (dispatch, getState) {
        const currentUser = auth.currentUser.uid;
        const likes = getState().likes;
        likes.likes = video.likes;
        likes.dislikes = video.dislikes;
        const isLiked = video.isLikedBy.find(user => user === currentUser);
        const isDisliked = video.isDislikedBy.find(user => user === currentUser);
        if (!isLiked) {
            dispatch(likeVideo(likes.likes));
            db.collection('videos2').doc(id).update({ likes: likes.likes + 1 });
            db.collection('videos2').doc(id).update({ isLikedBy: [...video.isLikedBy, currentUser] });
        }
        if (!isLiked && isDisliked) {
            db.collection('videos2').doc(id).update({ likes: likes.likes + 1 });
            db.collection('videos2').doc(id).update({ dislikes: likes.dislikes - 1 });
            db.collection('videos2').doc(id).update({ isDislikedBy: video.isLikedBy.filter(user => user !== currentUser)  });
            db.collection('videos2').doc(id).update({ isLikedBy: [...video.isLikedBy, currentUser] });
        }
        // db.collection('videos2').doc().update
        console.log(id);
    }
};

export const dislikeIt = (video, id) => {
    return function (dispatch, getState) {
        const currentUser = auth.currentUser.uid;
        const likes = getState().likes;
        likes.likes = video.likes;
        likes.dislikes = video.dislikes;
        const isLiked = video.isLikedBy.find(user => user === currentUser);
        const isDisliked = video.isDislikedBy.find(user => user === currentUser);
        if (!isDisliked) {
            db.collection('videos2').doc(id).update({ dislikes: likes.likes + 1 });
            db.collection('videos2').doc(id).update({ isDislikedBy: [...video.isDislikedBy, currentUser] });
        }
        if (!isDisliked && isLiked) {
            db.collection('videos2').doc(id).update({ likes: likes.likes - 1 });
            db.collection('videos2').doc(id).update({ dislikes: likes.dislikes + 1 });
            db.collection('videos2').doc(id).update({ isLikedBy: video.isLikedBy.filter(user => user !== currentUser) });
            db.collection('videos2').doc(id).update({ isDislikedBy: [...video.isDislikedBy, currentUser] });
        }
    }
};