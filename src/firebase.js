import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    // apiKey: "AIzaSyAEi-WJdiPpCLrpiZ1cGG2t1FVRUWGC6rs",
    // authDomain: "fir-5612c.firebaseapp.com",
    // projectId: "fir-5612c",
    // storageBucket: "fir-5612c.appspot.com",
    // messagingSenderId: "399559557724",
    // appId: "1:399559557724:web:0ddcd0893a279ef6169c99",
    apiKey: "AIzaSyC9YloI35_8yEuzwNBwsK8xH0FWEOqKz5k",
    authDomain: "test2-47df2.firebaseapp.com",
    projectId: "test2-47df2",
    storageBucket: "test2-47df2.appspot.com",
    messagingSenderId: "961410975780",
    appId: "1:961410975780:web:7e9387c499f8c6073f70b1"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const gitHubProvider = new firebase.auth.GithubAuthProvider();