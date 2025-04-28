// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDffZylQnB68LJ-Jt9F5vPWnflIX__RjA",
  authDomain: "coco-bubble-tea.firebaseapp.com",
  projectId: "coco-bubble-tea",
  storageBucket: "coco-bubble-tea.firebasestorage.app",
  messagingSenderId: "337513931627",
  appId: "1:337513931627:web:45a5aeee75368d3a31222e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore
export const db = getFirestore(app);

// Export Authentication
export const auth = getAuth(app);
