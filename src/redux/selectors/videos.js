export const getVideoStore = state => state.videos;
export const getVideos = state => getVideoStore(state).videos;
export const getVideosLength = state => getVideos(state).length;
export const getMyVideos = state => getVideoStore(state).myVideos;
