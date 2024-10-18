// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1h8pxJsKW6KNvKDSmTWS6o9-UyXWVltg",
  authDomain: "shopease-eaaa6.firebaseapp.com",
  projectId: "shopease-eaaa6",
  storageBucket: "shopease-eaaa6.appspot.com",
  messagingSenderId: "669626797007",
  appId: "1:669626797007:web:7d7259d5e65547bfa6a0ba",
  measurementId: "G-BQDPWPGNQR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const messaging = getMessaging(app);

export { app, messaging, getToken, onMessage };
