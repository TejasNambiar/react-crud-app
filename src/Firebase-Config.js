// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAF_-WiNkOP7XQCJrFzTtVUW0Cmn8EwS-U",
  authDomain: "react-crud-app-2.firebaseapp.com",
  projectId: "react-crud-app-2",
  storageBucket: "react-crud-app-2.firebasestorage.app",
  messagingSenderId: "21828569855",
  appId: "1:21828569855:web:16ae1f2193adecfe395aca",
  measurementId: "G-H2LHB2GZ01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)