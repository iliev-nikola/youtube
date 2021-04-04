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
    apiKey: "AIzaSyBngnjosq6mEWwDgpEWWC0L61uLnOK7oQI",
    authDomain: "test3-baf3f.firebaseapp.com",
    projectId: "test3-baf3f",
    storageBucket: "test3-baf3f.appspot.com",
    messagingSenderId: "362934764446",
    appId: "1:362934764446:web:79e400a199f29d676acc8f"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const gitHubProvider = new firebase.auth.GithubAuthProvider();