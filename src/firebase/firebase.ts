// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDokCm0JyyMfT8K0NpmGiYxtjKD5AP_65U",
  authDomain: "users-4d771.firebaseapp.com",
  projectId: "users-4d771",
  storageBucket: "users-4d771.appspot.com",
  messagingSenderId: "606797551984",
  appId: "1:606797551984:web:01221d4e077630aaf357b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };