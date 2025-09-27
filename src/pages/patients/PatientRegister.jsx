import React, { useState } from 'react';
import api from '../../api';

export default function PatientRegister() {
  const [form, setForm] = useState({ name:'', email:'', password:'', age:'', gender:'' });
  const [msg, setMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post('/patients/register', form);
      setMsg('Registered successfully! You can login now.');
    } catch (err) {
      setMsg(err.response?.data?.msg || 'Registration failed');
    }
  }

  return (
    <div>
      <h2>Patient Register</h2>
      {msg && <p>{msg}</p>}
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} /><br/>
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} /><br/>
        <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} /><br/>
        <input placeholder="Age" type="number" value={form.age} onChange={e=>setForm({...form, age:e.target.value})} /><br/>
        <input placeholder="Gender" value={form.gender} onChange={e=>setForm({...form, gender:e.target.value})} /><br/>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
