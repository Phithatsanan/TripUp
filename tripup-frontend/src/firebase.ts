// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getPerformance } from "firebase/performance";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQ8gq7OnCt5IMW0Qtnlx39W8kYNLcAhCM",
  authDomain: "tripup-project.firebaseapp.com",
  projectId: "tripup-project",
  storageBucket: "tripup-project.appspot.com",
  messagingSenderId: "195853100497",
  appId: "1:195853100497:web:7ee076a8920cb43f49acf0",
  measurementId: "G-HH7SFVRXQZ"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const perf = getPerformance(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, app, auth, provider, analytics, perf };
