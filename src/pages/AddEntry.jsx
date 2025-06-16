import React, { useState } from 'react';
import { ref, push } from 'firebase/database';
import { db } from '../firebaseConfig';

export default function AddEntry() {
  const [client, setClient] = useState('');
  const [procedure, setProcedure] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!client || !procedure || !date) {
      alert('Заполните все поля');
      return;
    }

    const entry = {
      client,
      procedure,
      date
    };

    try {
      console.log('📤 Сохраняем в Firebase:', entry);
      await push(ref(db, 'entries'), entry);
      alert('✅ Запись добавлена!');
      setClient('');
      setProcedure('');
      setDate('');
    } catch (err) {
      console.error('❌ Ошибка при сохранении:', err);
      alert('❌ Ошибка при сохранении. Смотри консоль.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '1rem', color: '#7B5EA7' }}>Добавить запись</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Имя клиента"
          value={client}
          onChange={(e) => setClient(e.target.value)}
        />
        <input
          type="text"
          placeholder="Процедура"
          value={procedure}
          onChange={(e) => setProcedure(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit" style={{ background: '#BFA2DB', color: 'white', border: 'none', padding: '0.5rem' }}>
          Добавить
        </button>
      </form>
    </div>
  );
}
