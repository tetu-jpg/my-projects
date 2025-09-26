import React, { useState } from 'react';
import api from '../../api';

export default function DoctorLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('doctor', JSON.stringify(data.doctor));
      onLogin(data.doctor);
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    }
  }

  return (
    <div>
      <h2>Doctor Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br/>
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} /><br/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
