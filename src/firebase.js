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
    apiKey: "AIzaSyC3CACO5CcaCbqbMq61_lVZtRoD-RuqqFc",
    authDomain: "test-6bb25.firebaseapp.com",
    projectId: "test-6bb25",
    storageBucket: "test-6bb25.appspot.com",
    messagingSenderId: "340792782992",
    appId: "1:340792782992:web:2bc2a03a7cec67620d6815"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const gitHubProvider = new firebase.auth.GithubAuthProvider();