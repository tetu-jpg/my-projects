import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Doctor pages
import DoctorLogin from './pages/doctors/DoctorLogin';
import DoctorRegister from './pages/doctors/DoctorRegister';
import DoctorDashboard from './pages/doctors/DoctorDashboard';

// Patient pages
import PatientLogin from './pages/patients/PatientLogin';
import PatientRegister from './pages/patients/PatientRegister';
import PatientDashboard from './pages/patients/PatientDashboard';

export default function App() {
  const [doctor, setDoctor] = useState(JSON.parse(localStorage.getItem('doctor')));
  const [patient, setPatient] = useState(JSON.parse(localStorage.getItem('patient')));

  return (
    <Router>
      <Routes>
        {/* Doctor Routes */}
        <Route path="/doctor/login" element={<DoctorLogin onLogin={setDoctor} />} />
        <Route path="/doctor/register" element={<DoctorRegister />} />
        <Route
          path="/doctor/dashboard"
          element={doctor ? <DoctorDashboard /> : <Navigate to="/doctor/login" />}
        />

        {/* Patient Routes */}
        <Route path="/patient/login" element={<PatientLogin onLogin={setPatient} />} />
        <Route path="/patient/register" element={<PatientRegister />} />
        <Route
          path="/patient/dashboard"
          element={patient ? <PatientDashboard /> : <Navigate to="/patient/login" />}
        />

        {/* Default Route */}
        <Route
          path="*"
          element={
            doctor ? (
              <Navigate to="/doctor/dashboard" />
            ) : patient ? (
              <Navigate to="/patient/dashboard" />
            ) : (
              <Navigate to="/patient/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}
