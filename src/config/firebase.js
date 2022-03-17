// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/database";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqVg6NDKHUPSAsq-6Ra8eV7dzi5DC0puE",
  authDomain: "ecommerce-ef921.firebaseapp.com",
  projectId: "ecommerce-ef921",
  storageBucket: "ecommerce-ef921.appspot.com",
  messagingSenderId: "671280688390",
  appId: "1:671280688390:web:ab970dd8bb2c6fdafbc287"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth =getAuth(app);
export const db = getDatabase();

export const dbFire =getFirestore(app)
 
