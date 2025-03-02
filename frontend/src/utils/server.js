// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMrD5SKeL8PJuG-kQz49xHRVd4-xGFhB4",
  authDomain: "repliesai-22011.firebaseapp.com",
  projectId: "repliesai-22011",
  storageBucket: "repliesai-22011.firebasestorage.app",
  messagingSenderId: "979299555726",
  appId: "1:979299555726:web:e2883a4b599ebb3f3f6cdf",
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
