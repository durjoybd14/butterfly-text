import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDZsAooDswFQjP3u7IdeyolYX9dRAJQ0gY",
  authDomain: "butterfly-text.firebaseapp.com",
  projectId: "butterfly-text",
  storageBucket: "butterfly-text.appspot.com",
  messagingSenderId: "419210010333",
  appId: "1:419210010333:web:9d947b6165d1de7303c534",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
