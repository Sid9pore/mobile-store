import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';

export default function Header() {
  const dispatch = useDispatch();
  return (
    <header className="bg-gray-800 text-white px-4 py-2 flex justify-between">
      <h1 className="text-xl">Mobile Store</h1>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </header>
  );
}
