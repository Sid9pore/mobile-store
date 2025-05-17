import React, { useEffect, useState } from 'react';
import api from '../api/api';
import ProductForm from '../components/ProductForm';
import ProductCard from '../components/ProductCard';

export default function AdminHome() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    const res = await api.get('/admin/products');
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    await api.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Admin Dashboard</h2>
      <ProductForm product={editingProduct} onSave={() => {
        setEditingProduct(null);
        fetchProducts();
      }} />
      <div className="grid grid-cols-3 gap-4 mt-4">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            isAdmin
            onEdit={() => setEditingProduct(p)}
            onDelete={() => handleDelete(p.id)}
          />
        ))}
      </div>
    </div>
  );
}
