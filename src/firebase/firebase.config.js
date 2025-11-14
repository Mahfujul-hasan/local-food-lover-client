// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7W-0paQB0LyCi5hCY9-kv8wTuOdPw9wc",
  authDomain: "local-food-lover-a32fe.firebaseapp.com",
  projectId: "local-food-lover-a32fe",
  storageBucket: "local-food-lover-a32fe.firebasestorage.app",
  messagingSenderId: "354130818797",
  appId: "1:354130818797:web:904f124c82f729f19d7ee4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);