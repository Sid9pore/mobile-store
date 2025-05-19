import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../api/api';

const CustomerHome = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch products');
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="customer-home">
      <div className="overlay"></div>

      <div className="content-container">
        <h1 className="page-title">Available Products</h1>
        {error && <p className="error-message">{error}</p>}

        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <h2 className="product-name">{product.name}</h2>
              <p className="product-description">{product.description}</p>
              <p className="product-price">${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerHome;
