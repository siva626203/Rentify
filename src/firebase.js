// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5Qi-StGeTxCWm7gliRQ3itW2Fivu6L-M",
  authDomain: "presidio-74358.firebaseapp.com",
  projectId: "presidio-74358",
  storageBucket: "presidio-74358.appspot.com",
  messagingSenderId: "87714467241",
  appId: "1:87714467241:web:a12b92fb8e6f0582e788b8",
  measurementId: "G-FM7P9LG6H3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

