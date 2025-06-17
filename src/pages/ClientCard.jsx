import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ref as dbRef, onValue, set, get } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebaseConfig';
import { storage } from "../firebaseStorage.js";
 // Создай firebaseStorage.js с инициализацией storage

export default function ClientCard() {
  const { name } = useParams();
  const [selectedDate, setSelectedDate] = useState('');
  const [beforePhoto, setBeforePhoto] = useState(null);
  const [afterPhoto, setAfterPhoto] = useState(null);
  const [imageURLs, setImageURLs] = useState({ before: '', after: '' });

  useEffect(() => {
    if (name && selectedDate) {
      const path = `clients/${name}/appointments/${selectedDate}`;
      const appointmentRef = dbRef(db, path);
      get(appointmentRef).then(snapshot => {
        const data = snapshot.val();
        if (data) {
          setImageURLs({
            before: data.before || '',
            after: data.after || ''
          });
        }
      });
    }
  }, [name, selectedDate]);

  const handleUpload = async (file, type) => {
    if (!selectedDate) {
      alert('Сначала выберите дату приёма!');
      return;
    }
    const fileRef = storageRef(storage, `clients/${name}/${selectedDate}/${type}.jpg`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);

    // Сохраняем в Realtime Database
    const dbPath = dbRef(db, `clients/${name}/appointments/${selectedDate}`);
    set(dbPath, {
      ...imageURLs,
      [type]: url
    });
0
    setImageURLs(prev => ({ ...prev, [type]: url }));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: '#BFA2DB' }}>Карточка клиента: {name}</h2>

      <label style={{ display: 'block', margin: '1rem 0' }}>
        Выберите дату приёма:
        <input
          type="date"
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
          style={{ marginLeft: '1rem' }}
        />
      </label>

      <div style={{ marginTop: '1rem' }}>
        <label><strong>Фото ДО:</strong>
          <input
            type="file"
            accept="image/*"
            onChange={e => handleUpload(e.target.files[0], 'before')}
          />
        </label>
        {imageURLs.before && (
          <img
            src={imageURLs.before}
            alt="Before"
            style={{ width: '150px', marginTop: '1rem', display: 'block' }}
          />
        )}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <label><strong>Фото ПОСЛЕ:</strong>
          <input
            type="file"
            accept="image/*"
            onChange={e => handleUpload(e.target.files[0], 'after')}
          />
        </label>
        {imageURLs.after && (
          <img
            src={imageURLs.after}
            alt="After"
            style={{ width: '150px', marginTop: '1rem', display: 'block' }}
          />
        )}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <a href="/clients" style={{ color: '#BFA2DB' }}>← Назад</a>
      </div>
    </div>
  );
}
