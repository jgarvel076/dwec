// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCf7UV1eXSjNauCOKPYyZbgeqe-LlXbo3w",
  authDomain: "proyecto-47bd6.firebaseapp.com",
  projectId: "proyecto-47bd6",
  storageBucket: "proyecto-47bd6.firebasestorage.app",
  messagingSenderId: "867509038950",
  appId: "1:867509038950:web:4a913a103e44014ecda2a7",
  measurementId: "G-0R3343ZNTG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);