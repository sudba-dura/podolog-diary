import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { onValue, ref } from 'firebase/database';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export default function CalendarPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const entriesRef = ref(db, 'entries');
    onValue(entriesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formatted = Object.values(data).map(entry => ({
          title: `${entry.client} / ${entry.procedure}`,
          date: entry.date
        }));
        setEvents(formatted);
      } else {
        setEvents([]);
      }
    });
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ fontSize: '24px', color: '#7B5EA7' }}>Календарь записей</h2>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locale="ru"
        events={events}
        height="auto"
      />
    </div>
  );
}