// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore, doc , setDoc} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgaIt_gR_WnFlIfmUu522fMQdFb0OvzPM",
  authDomain: "financely-nsg.firebaseapp.com",
  projectId: "financely-nsg",
  storageBucket: "financely-nsg.appspot.com",
  messagingSenderId: "503447649776",
  appId: "1:503447649776:web:70f1451ac456a4c3a33135",
  measurementId: "G-B4YRLLY7D9"
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db= getFirestore(app);
const auth= getAuth(app);
const provider= new GoogleAuthProvider();
export {db, auth, provider, doc, setDoc}