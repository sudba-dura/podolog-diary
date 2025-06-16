import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ClientCard({ events }) {
  const { name } = useParams();
  const clientKey = `photos_${name.toLowerCase()}`;

  const clientEvents = events.filter(e => e.title.toLowerCase().startsWith(name.toLowerCase()));
  const [images, setImages] = useState([]);

  // Загружаем из localStorage
  useEffect(() => {
    const saved = localStorage.getItem(clientKey);
    if (saved) {
      setImages(JSON.parse(saved));
    }
  }, [clientKey]);

  // Обработка загрузки фото
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    Promise.all(files.map(fileToDataUrl)).then((base64Images) => {
      const updated = [...images, ...base64Images];
      setImages(updated);
      localStorage.setItem(clientKey, JSON.stringify(updated));
    });
  };

  const fileToDataUrl = (file) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve({ name: file.name, url: reader.result });
      reader.readAsDataURL(file);
    });

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ fontSize: '24px', color: '#7B5EA7' }}>Карточка клиента: {name}</h2>

      <h4 style={{ marginTop: '1.5rem', fontSize: '18px' }}>История записей:</h4>
      <ul style={{ marginBottom: '2rem' }}>
        {clientEvents.map((e, i) => (
          <li key={i}>📅 {e.date} — {e.title}</li>
        ))}
      </ul>

      <h4 style={{ marginBottom: '0.5rem' }}>Загрузить фото (до / после):</h4>
      <input type="file" accept="image/*" multiple onChange={handleImageUpload} />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
        {images.map((img, i) => (
          <div key={i}>
            <img src={img.url} alt={img.name} style={{ width: '150px', borderRadius: '8px' }} />
          </div>
        ))}
      </div>

      <Link to="/clients" style={{ display: 'inline-block', marginTop: '2rem', color: '#BFA2DB' }}>← Назад</Link>
    </div>
  );
}
