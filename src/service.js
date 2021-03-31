import { db } from './firebase';
import { getCurrentUser } from './utils';

export function getAllVideos() {
    return new Promise((res, rej) => {
        res();
    });
}

export function getVideo(id) {

}

export function getUser(id) {

}

export function getUserVideos(arr) {

}

export function pushToWatched(id) {
    // find current user in firebase and push the id in the history array
}

export function pushToLiked(id) {
    // find current user in firebase and push the id in the liked array
}