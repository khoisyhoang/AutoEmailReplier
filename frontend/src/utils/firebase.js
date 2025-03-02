import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMrD5SKeL8PJuG-kQz49xHRVd4-xGFhB4",
  authDomain: "repliesai-22011.firebaseapp.com",
  databaseURL: "https://repliesai-22011-default-rtdb.firebaseio.com",
  projectId: "repliesai-22011",
  storageBucket: "repliesai-22011.appspot.com",
  messagingSenderId: "979299555726",
  appId: "1:979299555726:web:e2883a4b599ebb3f3f6cdf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Authentication
const db = getFirestore(app);
const database = getDatabase(app);

// Initialize Google Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("https://www.googleapis.com/auth/gmail.readonly");

export { app, auth, db, database, googleProvider };
