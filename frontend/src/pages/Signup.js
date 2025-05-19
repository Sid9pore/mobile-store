import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/api';
import { loginSuccess } from '../features/authSlice';
import '../index.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await signup(name, email, password, role);
      dispatch(loginSuccess(data));
      navigate(data.user.role === 'admin' ? '/admin' : '/customer');
    } catch (err) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
  <div className="signup-container">
  {/* Background Image */}
  <div
    className="signup-background"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1920&q=80')",
    }}
  ></div>

  {/* Overlay for slight dark tint if needed */}
  <div className="absolute inset-0 bg-black bg-opacity-30"></div>

  {/* Top-Left Logo */}
  <div className="signup-logo">
    📱 MobileMart
  </div>

  {/* Centered Form Container */}
  <div className="signup-form-wrapper">
    <div className="signup-form-container">
      <h1 className="signup-title">
        Join MobileMart
      </h1>
      <p className="signup-subtitle">
        Your one-stop shop for the latest mobile gadgets. Sign up now and explore!
      </p>

      {error && (
        <p className="signup-error">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />
        <input
          type="password"
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />

        <div>
          <label
            htmlFor="role"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Select Role:
          </label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition duration-300"
        >
          Sign Up
        </button>
      </form>

      <p className="signup-footer-text">
        Already have an account?{" "}
        <a
          href="/login"
          className="text-purple-600 hover:underline font-medium"
        >
          Login here
        </a>
      </p>
    </div>
  </div>
</div>

  );
};

export default Signup;
