// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDN5UfR5SpOmoqgwNFZeGb0Bjm9ER7_Lkk",
  authDomain: "clone-c9ed8.firebaseapp.com",
  projectId: "clone-c9ed8",
  storageBucket: "clone-c9ed8.firebasestorage.app",
  messagingSenderId: "95919544617",
  appId: "1:95919544617:web:48a5a4dec20b11bc8bbf38",
  measurementId: "G-27H98V9FH0",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore()
const analytics = getAnalytics(app);
