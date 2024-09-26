// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5VYsrJgGQax0Wl5CkUj3I2gk8A0nWo04",
  authDomain: "netflixgpt-72c9f.firebaseapp.com",
  projectId: "netflixgpt-72c9f",
  storageBucket: "netflixgpt-72c9f.appspot.com",
  messagingSenderId: "727030564855",
  appId: "1:727030564855:web:6c5f0b9072f85c355c50f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
export const auth = getAuth();