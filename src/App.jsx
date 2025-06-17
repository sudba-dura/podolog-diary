import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

import Today from './pages/Today';
import CalendarPage from './pages/CalendarPage';
import AddEntry from './pages/AddEntry';
import ClientsList from './pages/ClientsList';
import ClientCard from './pages/ClientCard';
import Login from './pages/Login'; // <-- ОБЯЗАТЕЛЬНО подключен

export default function App() {
  const [events, setEvents] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false); // <-- Флаг входа

  const addEvent = (event) => {
    setEvents([...events, event]);
  };

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />; // <-- Отображается окно входа
  }

  return (
    <Router>
      <div style={{ padding: '1rem', background: '#BFA2DB', color: '#fff' }}>
        <Link to="/" style={{ marginRight: '1rem', color: '#fff' }}>✨Сегодня</Link>
        <Link to="/calendar" style={{ marginRight: '1rem', color: '#fff' }}>Календарь</Link>
        <Link to="/add" style={{ marginRight: '1rem', color: '#fff' }}>Добавить</Link>
        <Link to="/clients" style={{ color: '#fff' }}>Клиенты</Link>
      </div>

      <Routes>
        <Route path="/" element={<Today />} />
        <Route path="/calendar" element={<CalendarPage events={events} />} />
        <Route path="/add" element={<AddEntry onAdd={addEvent} />} />
        <Route path="/clients" element={<ClientsList events={events} />} />
        <Route path="/client/:name" element={<ClientCard events={events} />} />
        <Route path="/login" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
