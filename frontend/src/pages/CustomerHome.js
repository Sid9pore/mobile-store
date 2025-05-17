import React, { useEffect, useState } from 'react';
import api from '../api/api';
import ProductCard from '../components/ProductCard';

export default function CustomerHome() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products').then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Available Mobile Phones</h2>
      <div className="grid grid-cols-3 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
