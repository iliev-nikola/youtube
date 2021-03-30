import { useEffect, useState } from 'react';
import ProgressBar from './Components/ProgressBar/ProgressBar';
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

export function setCurrentUser() {
  auth.onAuthStateChanged(user => {
    if (user) {
      const data = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid
      }
      localStorage.setItem('currentUser', JSON.stringify(data));

    };
  });
}

export function login() {
  localStorage.setItem('isLoggedIn', JSON.stringify(true));
  setCurrentUser();
}

export function signOut() {
  auth.signOut();
  localStorage.setItem('isLoggedIn', JSON.stringify(false));
  localStorage.setItem('currentUser', null);
}

export function isLoggedIn() {
  return JSON.parse(localStorage.getItem('isLoggedIn'));
}

export function isCurrentUser(userId) {
  return getCurrentUser().uid === userId;
}

export function filterVideos(params) {
  if (!Array.isArray(params)) {
    return videos.filter(el => el.title.toLowerCase().includes(params));
  }

  let filtered = videos;
  params.forEach(word => {
    if (word !== ' ') {
      filtered = filtered.filter(el => el.title.toLowerCase().includes(word));
    }
  });

  return filtered;
}

export function loading(condition) {
  if (condition === 'off') {
    return <ProgressBar isOn={false} />
  } else {
    return <ProgressBar isOn={true} />
  }
}
