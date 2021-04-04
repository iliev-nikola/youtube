export const getVideoStore = store => store.videos;
export const getVideos = store => getVideoStore(store).videos;
export const getVideosLength = store => getVideos(store).length;
export const getMyVideos = store => getVideoStore(store).myVideos;
