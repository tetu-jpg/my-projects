import React, { useState, useEffect } from 'react';
import api from '../../api';

export default function BookAppointment({ onBooked }) {
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    api.get('/doctors').then(res => setDoctors(res.data)).catch(err => console.error(err));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post('/appointments', { doctorId, time });
      alert('Appointment booked!');
      if (onBooked) onBooked();
    } catch (err) {
      console.error(err);
      alert('Error booking appointment');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <select value={doctorId} onChange={e => setDoctorId(e.target.value)}>
        <option value="">Select Doctor</option>
        {doctors.map(d => <option key={d.id} value={d.id}>{d.name} ({d.specialization})</option>)}
      </select><br/>
      <input type="datetime-local" value={time} onChange={e => setTime(e.target.value)} /><br/>
      <button type="submit">Book</button>
    </form>
  );
}
