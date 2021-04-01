export const getVideoStore = store => store.videos;
export const getVideos = store => getVideoStore(store).videos;