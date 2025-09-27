import React, { useEffect, useState } from "react";
import api from "../../api";

export default function PatientRecords() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    api.get("/patients")
      .then(res => setPatients(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Patient Records</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>DOB</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.email}</td>
              <td>{p.phone}</td>
              <td>{p.dob}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
