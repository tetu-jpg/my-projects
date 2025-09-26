import React, { useEffect, useState } from 'react';
import api from '../../api';
import BookAppointment from './BookAppointment';
import PharmacyRequests from './PharmacyRequests';

export default function PatientDashboard() {
  const patient = JSON.parse(localStorage.getItem('patient'));
  const [appointments, setAppointments] = useState([]);
  const [showBooking, setShowBooking] = useState(false);
  const [showPharmacy, setShowPharmacy] = useState(false);

  useEffect(() => {
    if (patient) {
      api.get(`/appointments/patient`)
         .then(res => setAppointments(res.data))
         .catch(err => console.error(err));
    }
  }, [patient]);

  if (!patient) return <p>Please login</p>;

  return (
    <div>
      <h2>Welcome {patient.name}</h2>
      
      <h3>Your Appointments</h3>
      <ul>
        {appointments.map(a => (
          <li key={a.id}>
            Doctor: {a.doctor_name} – {new Date(a.time).toLocaleString()} – {a.status}
          </li>
        ))}
      </ul>

      {/* Book Appointment */}
      <button onClick={() => setShowBooking(!showBooking)}>📅 Book Appointment</button>
      {showBooking && <BookAppointment onBooked={() => setShowBooking(false)} />}

      {/* Pharmacy Requests */}
      <button onClick={() => setShowPharmacy(!showPharmacy)}>💊 Pharmacy Requests</button>
      {showPharmacy && <PharmacyRequests onOrdered={() => setShowPharmacy(false)} />}
    </div>
  );
}
