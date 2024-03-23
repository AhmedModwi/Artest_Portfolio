import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Configure Firebase.
const firebaseConfig = {
  apiKey: "AIzaSyDoW3JolzYolQqvYAheE33nUWoHts6rnT8",
  authDomain: "artis-portfolio.firebaseapp.com",
  projectId: "artis-portfolio",
  storageBucket: "artis-portfolio.appspot.com",
  messagingSenderId: "439986657875",
  appId: "1:439986657875:web:600822199a241debd8c4a6",
  measurementId: "G-8T3LB2CEXW"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db  = getFirestore(app);
export const storage = getStorage(app); 

