import React, { useState } from "react";
import api from "../../api";

export default function PatientLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await api.post("/patients/login", { email, password });
      localStorage.setItem("patient", JSON.stringify(data.patient));
      if (onLogin) onLogin(data.patient);
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
  }

  return (
    <div>
      <h2>Patient Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
