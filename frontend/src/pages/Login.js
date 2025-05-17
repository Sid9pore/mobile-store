import React, { useState } from 'react';
import api from '../api/api';
import { useDispatch } from 'react-redux';
import { login } from '../features/authSlice';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const res = await api.post('/login', { email, password });
    dispatch(login({ token: res.data.token, role: parseJwt(res.data.token).role }));
  };
  const parseJwt = (token) => JSON.parse(atob(token.split('.')[1]));

  return (
    <div>
      <h1>Login</h1>
      <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}