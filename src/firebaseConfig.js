import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCtMywvu0o-tPdkqALUn3LVNdy_7AMrMdg",
  authDomain: "podolog-diary.firebaseapp.com",
  databaseURL: "https://podolog-diary-default-rtdb.europe-west1.firebasedatabase.app", // ← ОБЯЗАТЕЛЬНО!
  projectId: "podolog-diary",
  storageBucket: "podolog-diary.firebasestorage.app",
  messagingSenderId: "471564210476",
  appId: "1:471564210476:web:2b2f792b552c6acc2b1c89",
  measurementId: "G-0W9ZXE897X"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
