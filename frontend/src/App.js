import React from 'react';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminHome from './pages/AdminHome';
import CustomerHome from './pages/CustomerHome';
import Header from './components/Header';

function App() {
  const { token, role } = useSelector((state) => state.auth);
  if (!token) return <Login />;
  return (
    <div>
      <Header />
      {role === 'admin' ? <AdminHome /> : <CustomerHome />}
    </div>
  );
}
export default App;