import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAI2JcTgoYnPTTWg__T_0G2L5tb5MIeJ7w",
  authDomain: "gpt-human-assessment.firebaseapp.com",
  projectId: "gpt-human-assessment",
  storageBucket: "gpt-human-assessment.firebasestorage.app",
  messagingSenderId: "58020080181",
  appId: "1:58020080181:web:6f14c719e9e279ee685f7c",
  measurementId: "G-2K0PZ8LXH3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };