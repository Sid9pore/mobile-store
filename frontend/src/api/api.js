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

export const signup = async (email, password, role) => {
  const response = await api.post('/api/signup', { email, password, role });
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
