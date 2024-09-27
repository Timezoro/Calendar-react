// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5C8JmkXbGCT5ixuIGHsFni6pt-Lof8r8",
  authDomain: "calendar-a322f.firebaseapp.com",
  projectId: "calendar-a322f",
  storageBucket: "calendar-a322f.appspot.com",
  messagingSenderId: "555461044935",
  appId: "1:555461044935:web:ce9a7b5eb4ba58eee1ece2",
  measurementId: "G-VTXWR9SS72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//firsestore
const db = getFirestore(app);

export default db;