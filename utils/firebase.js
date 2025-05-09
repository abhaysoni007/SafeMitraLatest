// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC80sPxZdeHlQex8r-1EYc6IPvwM3pk-_Y",
  authDomain: "safemitra-497a6.firebaseapp.com",
  projectId: "safemitra-497a6",
  storageBucket: "safemitra-497a6.firebasestorage.app",
  messagingSenderId: "795679074054",
  appId: "1:795679074054:web:271f4904b466d8c1cd6087",
  measurementId: "G-9L4TVVSYV9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
