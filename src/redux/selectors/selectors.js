export const getUserStore = store => store.user;
export const getUser = store => getUserStore(store).user;
export const getVideos = state => state.videos.videos;
export const getVideoComments = state => state.comments.comments;
