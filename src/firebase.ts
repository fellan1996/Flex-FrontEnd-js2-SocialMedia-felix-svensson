// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKbLjosd08rcUKWR2Imzv2G2OA-4PUG-Y",
  authDomain: "social-media-flex.firebaseapp.com",
  projectId: "social-media-flex",
  storageBucket: "social-media-flex.appspot.com",
  messagingSenderId: "558143348206",
  appId: "1:558143348206:web:dbba8171e5e1cb47f742ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;