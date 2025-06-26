// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfKu_vf1A_2G8rBNJR4SWgXRUgfvE8_M0",
  authDomain: "netflixpro-3910f.firebaseapp.com",
  projectId: "netflixpro-3910f",
  storageBucket: "netflixpro-3910f.firebasestorage.app",
  messagingSenderId: "8740182247",
  appId: "1:8740182247:web:75ae1d845379808db22a42",
  measurementId: "G-9BX62VQ361"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();