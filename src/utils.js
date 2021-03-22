import { auth, firestore } from './firebase';

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

// export function setCurrentUser() {
//   auth.onAuthStateChanged(user => {
//     if (user) {
//       firestore.collection('users').get()
//         .then(res => Array.from(res.docs))
//         .then(res => res.map(el => el.data()))
//         .then(res => res.find(el => el.email === user.email))
//         .then(res => localStorage.setItem('currentUser', JSON.stringify(res))) 
//     }
//   });
// }

export function login() {
  localStorage.setItem('isLoggedIn', true);
}

export function signOut() {
  auth.signOut();
  localStorage.setItem('isLoggedIn', false);
  localStorage.setItem('currentUser', null);
}

export function isLoggedIn() {
  return JSON.parse(localStorage.getItem('isLoggedIn'));
}
