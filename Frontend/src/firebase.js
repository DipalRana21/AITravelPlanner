// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // if you're using Firestore
import { getFunctions } from "firebase/functions"; 


const firebaseConfig = {
  apiKey: "AIzaSyBi_I_MtawEwFM0a-EVFZaGWnQbOfRJv-k",
  authDomain: "tripmind-bb3d4.firebaseapp.com",
  projectId: "tripmind-bb3d4",
  storageBucket: "tripmind-bb3d4.firebasestorage.app",
  messagingSenderId: "103212455897",
  appId: "1:103212455897:web:0869d440ecff9ec21b6bc8"
};



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 

export const functions = getFunctions(app);

export { app, auth, db };
