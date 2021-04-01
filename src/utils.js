import { auth, db } from './firebase';
import { videos } from './service';

export function generateId() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function validateEmail(email) {
  const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(String(email).toLowerCase());
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser'));
}

export function isCurrentUser(userId) {
  return getCurrentUser().uid === userId;
}

export function filterVideos(params) {
  if (!params.length) return null;
  if (params.length === 1) {
    return db.collection('videos').get()
      .then(res => res.docs)
      .then(res => res.map(x => x.data()))
      .then(res => {
        const result = res.filter(el => el.title.toLowerCase().includes(params[0]));
        console.log(result);
        return result;
      })
  } else {
    db.collection('videos').get()
      .then(res => {
        let filtered = res;
        params.forEach(word => {
          if (word !== ' ') {
            filtered = filtered.filter(el => el.title.toLowerCase().includes(word));
          }
        });

        return filtered;
      });
  }
}

export function timeConvert(s) {
  const seconds = Math.floor(s);
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return (`${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`)
}

export function getDate() {
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  return `${day}-${month}-${year}`;
}