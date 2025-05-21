import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// 🔐 Auth
export const login = async (email, password) => {
  const response = await api.post('/login', { email, password });
  return response.data;
};

export const signup = async (name, email, password, role) => {
  const response = await api.post('/signup', { name, email, password, role });
  return response.data;
};

export const createProduct = async (product, token) => {
  const response = await api.post('/products', product, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateProduct = async (productId, product, token) => {
  const response = await api.put(`/products/${productId}`, product, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteProduct = async (productId, token) => {
  const response = await api.delete(`/products/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getAllProducts = async () => {
  const response = await api.get('/products'); // replace with your API URL
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};


export const fetchAdminProducts = async (adminId) => {
  const response = await api.get(`/admin/products/${adminId}`);
  return response.data;
};
