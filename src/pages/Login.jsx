import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [pin, setPin] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin === '1234') {
      onLogin();
    } else {
      alert('❌ Неверный PIN-код');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-300">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full animate-fade-in">
        <h2 className="text-2xl font-semibold text-center text-purple-700 mb-6">
          🔐 Введите PIN-код
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="PIN"
            className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg transition"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}
