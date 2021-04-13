export const getVideo = state => state.video.video || {};
export const getVideoID = state => getVideo(state).id;
export const getVideoAuthorID = state => getVideo(state).authorID;
export const getVideoTitle = state => getVideo(state).title;
export const getVideoViews = state => getVideo(state).views;
export const getVideoAuthor = state => getVideo(state).author;
export const getVideoDescription = state => getVideo(state).description;
export const getVideoURL = state => getVideo(state).url;
export const getVideoWatched = state => getVideo(state).isWatchedBy;
export const getVideoLikes = state => getVideo(state).isLikedBy;
export const getVideoDislikes = state => getVideo(state).isDislikedBy;
export const getVideoComments = state => state.comments.comments;


// const { id, authorID } = useSelector(getVideo);