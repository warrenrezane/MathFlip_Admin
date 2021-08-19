import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBWkhFNCpa1RAwWpyUGWe5YNpP9ElosBA8",
  authDomain: "mathflip-e24a1.firebaseapp.com",
  projectId: "mathflip-e24a1",
  storageBucket: "mathflip-e24a1.appspot.com",
  messagingSenderId: "423371330357",
  appId: "1:423371330357:web:3982fddfb66ef4ea34327c",
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const auth = firebase.auth;

export { firestore, auth, firebase };
