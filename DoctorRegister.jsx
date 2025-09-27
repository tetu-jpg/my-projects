import React, { useState } from 'react';
import api from '../../api';

export default function DoctorRegister() {
  const [form, setForm] = useState({ name:'', email:'', password:'', specialization:'', affiliation:'' });
  const [msg, setMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      setMsg('Registered successfully! You can login now.');
    } catch (err) {
      setMsg(err.response?.data?.msg || 'Registration failed');
    }
  }

  return (
    <div>
      <h2>Doctor Register</h2>
      {msg && <p>{msg}</p>}
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name:e.target.value})} /><br/>
        <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} /><br/>
        <input placeholder="Password" type="password" value={form.password} onChange={e => setForm({...form, password:e.target.value})} /><br/>
        <input placeholder="Specialization" value={form.specialization} onChange={e => setForm({...form, specialization:e.target.value})} /><br/>
        <input placeholder="Affiliation" value={form.affiliation} onChange={e => setForm({...form, affiliation:e.target.value})} /><br/>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
