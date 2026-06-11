// firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbv5Pawe0cUMKuCWNNj6zI03ZamzDSY7o",
  authDomain: "merch-collection.firebaseapp.com",
  projectId: "merch-collection",
  storageBucket: "merch-collection.firebasestorage.app",
  messagingSenderId: "698829546392",
  appId: "1:698829546392:web:9a5a19d00ea4babd20c1ed",
  measurementId: "G-G65CLYSVDH",
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);

// Authentication
export const auth = getAuth(app);

// Firestore Database
export const db = getFirestore(app);

export default app;