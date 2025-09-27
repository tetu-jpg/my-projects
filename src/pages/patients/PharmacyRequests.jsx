import React, { useState } from "react";
import api from "../../api";

export default function PharmacyRequests() {
  const [medicine, setMedicine] = useState("");
  const [success, setSuccess] = useState("");

  async function handleRequest() {
    try {
      await api.post("/pharmacy/requests", { medicine });
      setSuccess("Request sent successfully!");
      setMedicine("");
    } catch (err) {
      alert("Failed to send request");
    }
  }

  return (
    <div>
      <h3>Pharmacy Requests</h3>
      <input
        placeholder="Medicine name"
        value={medicine}
        onChange={(e) => setMedicine(e.target.value)}
      />
      <button onClick={handleRequest}>Request</button>
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}
