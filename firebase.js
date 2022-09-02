import { initializeApp, getApps, getApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBLOD-YjzMIzjOZZbp3vBsi75M9EOnAZZU",
    authDomain: "test-call-6068d.firebaseapp.com",
    projectId: "test-call-6068d",
    storageBucket: "test-call-6068d.appspot.com",
    messagingSenderId: "641378031380",
    appId: "1:641378031380:web:86edf4cfb0abb62cd7d401"
  };

const app =  !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };