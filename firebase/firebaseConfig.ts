// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvfEjKN5N5QdWzvmpKrf0EiFw73il-r2o",
  authDomain: "infinite-facet-455013-u4.firebaseapp.com",
  projectId: "infinite-facet-455013-u4",
  storageBucket: "infinite-facet-455013-u4.firebasestorage.app",
  messagingSenderId: "321654331360",
  appId: "1:321654331360:web:c2875da92474b3bdb37d85",
  measurementId: "G-FRPNN466YS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);