import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// 🔐 Auth
export const login = async (email, password) => {
  const response = await api.post('/api/login', { email, password });
  return response.data;
};

export const signup = async (name, email, password, role) => {
  const response = await api.post('/api/signup', { name, email, password, role });
  return response.data;
};

// 📦 Products
export const fetchProducts = async () => {
  const response = await api.get('/api/products');
  return response.data;
};

export const fetchAdminProducts = async (token) => {
  const response = await api.get('/api/admin/products', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createProduct = async (product, token) => {
  const response = await api.post('/api/products', product, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateProduct = async (productId, product, token) => {
  const response = await api.put(`/api/products/${productId}`, product, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteProduct = async (productId, token) => {
  const response = await api.delete(`/api/products/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await fetch(`http://yourbackendapi.com/users/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete user');
  }
  return response.json();
};

export const getAllProducts = async () => {
  const response = await fetch('http://yourbackendapi.com/products'); // replace with your API URL
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

export const getAllUsers = async () => {
  const response = await fetch('http://yourbackendapi.com/users'); // Replace with your real API URL
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};
