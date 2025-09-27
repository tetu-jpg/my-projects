import React, { useEffect, useState } from "react";
import api from "../../api";

export default function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    api.get("/prescriptions")
      .then(res => setPrescriptions(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Prescriptions</h2>
      <ul>
        {prescriptions.map(p => (
          <li key={p.id}>
            {p.notes} (Doctor: {p.doctor_id}, Patient: {p.patient_id})
          </li>
        ))}
      </ul>
    </div>
  );
}
