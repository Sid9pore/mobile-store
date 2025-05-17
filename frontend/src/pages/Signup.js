import React, { useState } from 'react';
import api from '../api/api';

export default function Signup() {
  const [form, setForm] = useState({ email: '', password: '', role: 'customer' });

  const handleSignup = async () => {
    await api.post('/signup', form);
    alert('Registered. Please login.');
  };

  return (
    <div>
      <h1>Signup</h1>
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <select onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="customer">Customer</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleSignup}>Register</button>
    </div>
  );
}