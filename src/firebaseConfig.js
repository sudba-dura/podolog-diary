// firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

// 🔐 Конфигурация Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCtMywvu0o-tPdkqALUn3LVNdy_7AMrMdg",
  authDomain: "podolog-diary.firebaseapp.com",
  databaseURL: "https://podolog-diary-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "podolog-diary",
  storageBucket: "podolog-diary.appspot.com", // ✅ правильный формат
  messagingSenderId: "471564210476",
  appId: "1:471564210476:web:2b2f792b552c6acc2b1c89",
  measurementId: "G-0W9ZXE897X"
};

// 🚀 Инициализация приложения Firebase
const app = initializeApp(firebaseConfig);

// 📦 Экспорт сервисов
export const db = getDatabase(app);
export const storage = getStorage(app);
export { firebaseConfig }; // 👈 чтобы можно было использовать в других местах

export default app; // опционально: если где-то нужно сам app
