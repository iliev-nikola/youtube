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
    apiKey: "AIzaSyADv616ym_Dkg-g-M89IheCVySdWIYuM14",
    authDomain: "test-6caba.firebaseapp.com",
    projectId: "test-6caba",
    storageBucket: "test-6caba.appspot.com",
    messagingSenderId: "1015418170637",
    appId: "1:1015418170637:web:b240777e5f291a33f61444"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const gitHubProvider = new firebase.auth.GithubAuthProvider();


