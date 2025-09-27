import React, { useEffect, useState } from 'react';
import api from '../../api';
import PrescriptionForm from './PrescriptionForm';
import PatientRecords from './PatientRecords';

export default function DoctorDashboard() {
  const doctor = JSON.parse(localStorage.getItem('doctor'));
  const [appointments, setAppointments] = useState([]);
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [viewRecordsPatient, setViewRecordsPatient] = useState(null);

  useEffect(() => {
    if (doctor) {
      api.get(`/appointments/doctor/${doctor.id}`)
         .then(res => setAppointments(res.data))
         .catch(err => console.error(err));
    }
  }, [doctor]);

  if (!doctor) return <p>Please login</p>;

  return (
    <div>
      <h2>Welcome Dr. {doctor.name}</h2>
      <h3>Your Appointments</h3>
      <ul>
        {appointments.map(a => (
          <li key={a.id}>
            <b>{a.patient_name}</b> – {new Date(a.time).toLocaleString()} – {a.status}
            <button onClick={() => setSelectedAppt(a)}>📝 Prescribe</button>
            <button onClick={() => setViewRecordsPatient(a.patient_id)}>📋 Records</button>
          </li>
        ))}
      </ul>

      {/* Nested Prescription Form */}
      {selectedAppt && (
        <PrescriptionForm
          appointmentId={selectedAppt.id}
          patientId={selectedAppt.patient_id}
          onSaved={() => setSelectedAppt(null)}
        />
      )}

      {/* Nested Patient Records */}
      {viewRecordsPatient && (
        <PatientRecords
          patientId={viewRecordsPatient}
          onClose={() => setViewRecordsPatient(null)}
        />
      )}
    </div>
  );
}
