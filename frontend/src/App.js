import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminHome from './pages/AdminHome';
import CustomerHome from './pages/CustomerHome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/customer" element={<CustomerHome />} />
        <Route path="*" element={<div className="p-6 text-red-600 text-xl">404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
