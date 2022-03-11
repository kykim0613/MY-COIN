import { initializeApp } from "firebase/app";
import * as firebase from "firebase/app"
import { getAuth } from 'firebase/auth';
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA962iycWxrRwgBHnxsDfVToDnfqgPSix8",
  authDomain: "coin-d01f1.firebaseapp.com",
  projectId: "coin-d01f1",
  storageBucket: "coin-d01f1.appspot.com",
  messagingSenderId: "388433648736",
  appId: "1:388433648736:web:68229375f56b7f1bc9f705"
};

export default initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService = getAuth();