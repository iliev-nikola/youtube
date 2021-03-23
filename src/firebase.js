import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAEi-WJdiPpCLrpiZ1cGG2t1FVRUWGC6rs",
    authDomain: "fir-5612c.firebaseapp.com",
    projectId: "fir-5612c",
    storageBucket: "fir-5612c.appspot.com",
    messagingSenderId: "399559557724",
    appId: "1:399559557724:web:0ddcd0893a279ef6169c99"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();

export function generateUserDocument(user, additionalData) {
    if (!user) return;
    db.doc(`users/${user.uid}`).get()
        .then(res => console.log(res))
    // const snapshot = await userRef.get();
    // if (!snapshot.exists) {
    //     const { email, displayName, photoURL } = user;
    //     try {
    //         await userRef.set({
    //             displayName,
    //             email,
    //             photoURL,
    //             ...additionalData
    //         });
    //     } catch (error) {
    //         alert("Error creating user document", error);
    //     }
    // }
    // return getUserDocument(user.uid);
};
export function getUserDocument(uid) {
    if (!uid) return null;
    db.doc(`users/${uid}`).get()
        .then(res => console.log(res.data()))
        .catch(err => alert(err));
    // try {
    //     const userDocument = await firestore.doc(`users/${uid}`).get();
    //     return {
    //         uid,
    //         ...userDocument.data()
    //     };
    // } catch (error) {
    //     alert("Error fetching user", error);
    // }
};
export const allVideos = [];
db.collection("videos")
    .get()
    .then((videos) => {
        videos.forEach((video) => {
            allVideos.push(video.data());
        });
    })