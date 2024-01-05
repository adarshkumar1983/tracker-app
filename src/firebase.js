// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


import{getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBddNzqwVLCeEEc2q3TJrerASUuawVrN40",
  authDomain: "tracker-a7db9.firebaseapp.com",
  projectId: "tracker-a7db9",
  storageBucket: "tracker-a7db9.appspot.com",
  messagingSenderId: "425135442305",
  appId: "1:425135442305:web:462c10ee1d01aedd778080",
  measurementId: "G-ZHFDC39525"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app);

export default app;
