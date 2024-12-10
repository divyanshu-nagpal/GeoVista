// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ai-travel-planner-2cf36.firebaseapp.com",
  projectId: "ai-travel-planner-2cf36",
  storageBucket: "ai-travel-planner-2cf36.firebasestorage.app",
  messagingSenderId: "58001378276",
  appId: "1:58001378276:web:0f333f6636d3d8e6ac95f1",
  measurementId: "G-77QP81XGZY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
// const analytics = getAnalytics(app);