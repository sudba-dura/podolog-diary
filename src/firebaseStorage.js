// firebaseStorage.js
import { getStorage } from 'firebase/storage';
import app from './firebaseConfig'; // импорт уже инициализированного app

// Экспортируем экземпляр хранилища
export const storage = getStorage(app);
