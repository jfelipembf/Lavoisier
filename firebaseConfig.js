import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCTNqzFbi5fVGbByYMsSqvh0pLp5hsNqCA",
  authDomain: "lavoisier-73885.firebaseapp.com",
  projectId: "lavoisier-73885",
  storageBucket: "lavoisier-73885.firebasestorage.app",
  messagingSenderId: "490704406592",
  appId: "1:490704406592:web:4f18ede0b5e4f32516f7a5",
  measurementId: "G-FQKZGZ8SJQ",
  databaseURL: "https://lavoisier-73885-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const database = getDatabase(app);

export { app, storage, database };