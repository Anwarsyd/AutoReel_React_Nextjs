// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "autoreel-aivideogenerator.firebaseapp.com",
  projectId: "autoreel-aivideogenerator",
  storageBucket: "autoreel-aivideogenerator.firebasestorage.app",
  messagingSenderId: "336961976008",
  appId: "1:336961976008:web:7fd7a0e4a4e655d43817fd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)