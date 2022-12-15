import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDLZ8nI96VFDLRv7Gm5O3lX1WwjuJG-yVI",
  authDomain: "career-boat-assignment-f1674.firebaseapp.com",
  projectId: "career-boat-assignment-f1674",
  storageBucket: "career-boat-assignment-f1674.appspot.com",
  messagingSenderId: "672399611693",
  appId: "1:672399611693:web:5394fb63a2b356adf565a4",
  measurementId: "G-BYRRF789D8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
