// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

console.log(process.env.REACT_APP_FIREBASE_KEY);

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "padelleague-967bc.firebaseapp.com",
  projectId: "padelleague-967bc",
  storageBucket: "padelleague-967bc.firebasestorage.app",
  messagingSenderId: "171408831537",
  appId: "1:171408831537:web:4d6fda50fa8b84d361d110",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize authentification
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const database = getDatabase(app);

export { auth, db, storage, database };

export default app;
