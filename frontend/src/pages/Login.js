import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/api';
import { loginSuccess } from '../features/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      console.log(data);
      dispatch(loginSuccess(data));
      if (data.role == 'admin') {
        navigate('/admin');
      } else {
        navigate('/customer');
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="auth-container">
      {/* Background and overlay */}
      <div
        className="auth-background"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1920&q=80')",
        }}
      />
      <div className="auth-overlay" />

      {/* Logo */}
      <div className="auth-logo">📱 MobileMart</div>

      {/* Form container */}
      <div className="auth-form-wrapper">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2 className="auth-title">Login</h2>
          {error && <p className="auth-error">{error}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
            required
          />
          <button type="submit" className="auth-submit-button">
            Login
          </button>
          <p className="auth-footer-text">
            Don't have an account?{' '}
            <button
              type="button"
              className="auth-link-button"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
