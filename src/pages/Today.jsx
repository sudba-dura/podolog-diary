import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebaseConfig';

export default function Today() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const entriesRef = ref(db, 'entries');
    onValue(entriesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const result = Object.values(data).filter(entry => entry.date === today);
        setEntries(result);
      } else {
        setEntries([]);
      }
    });
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#7B5EA7' }}>
        Записи на сегодня
      </h2>
      {entries.length === 0 ? (
        <p style={{ color: '#888' }}>Нет записей на сегодня</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {entries.map((entry, idx) => (
            <li key={idx} style={{
              background: '#BFA2DB',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1rem',
              color: 'white'
            }}>
              <strong>{entry.client}</strong><br />
              {entry.procedure}<br />
              {entry.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
