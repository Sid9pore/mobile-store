import React, { useEffect, useState } from 'react';
import api from '../api/api';

export default function ProductForm({ product, onSave }) {
  const [form, setForm] = useState({ name: '', description: '', price: '' });

  useEffect(() => {
    if (product) {
      setForm(product);
    } else {
      setForm({ name: '', description: '', price: '' });
    }
  }, [product]);

  const handleSubmit = async () => {
    if (product) {
      await api.put(`/products/${product.id}`, form);
    } else {
      await api.post('/products', form);
    }
    onSave();
  };

  return (
    <div className="mb-4">
      <h3 className="text-xl mb-2">{product ? 'Edit Product' : 'Add Product'}</h3>
      <input className="border w-full mb-2 p-1" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <textarea className="border w-full mb-2 p-1" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <input className="border w-full mb-2 p-1" type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
      <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>
        {product ? 'Update' : 'Create'}
      </button>
    </div>
  );
}
