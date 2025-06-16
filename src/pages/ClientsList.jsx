import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebaseConfig';
import { Link } from 'react-router-dom';

export default function ClientsList() {
  const [entries, setEntries] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const entriesRef = ref(db, 'entries');
    onValue(entriesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setEntries(Object.values(data));
      }
    });
  }, []);

  const filteredClients = [
    ...new Set(
      entries
        .filter(entry =>
          entry.client.toLowerCase().includes(search.toLowerCase())
        )
        .map(entry => entry.client)
    ),
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#7B5EA7' }}>
        Карточки клиентов
      </h2>

      <input
        type="text"
        placeholder="Поиск по имени"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: '8px',
          width: '100%',
          maxWidth: '400px',
          marginBottom: '1.5rem',
          borderRadius: '6px',
          border: '1px solid #ccc',
        }}
      />

      <ul style={{ marginTop: '1rem' }}>
        {filteredClients.map((client) => (
          <li key={client} style={{ marginBottom: '0.5rem' }}>
            <Link to={`/client/${client}`} style={{ color: '#6A0DAD' }}>
              {client}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
