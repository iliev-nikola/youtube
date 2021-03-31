import { db } from './firebase';
import { getCurrentUser } from './utils';


export function getAllVideos() {
    return new Promise((res, rej) => {
       
    });
}



export function getVideo(id) {
    return new Promise((res, rej) => {
        // res(videos.find(el => el.id === id));
    });
}

export function getUser(id) {
    return new Promise((res, rej) => {
        // res(users.find(el => el.userId === id));
    });
}

export function getUserVideos(arr) {
    // const filtered = videos.filter(video => arr.includes(video.id));
    // return new Promise((res, rej) => {
    //     res(filtered);
    // });
}

export function pushToWatched(id) {
    // find current user in firebase and push the id in the history array
}

export function pushToLiked(id) {
    // find current user in firebase and push the id in the liked array
}