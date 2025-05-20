import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../api/api';
import LogoutButton from '../components/LogoutButton';

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
       <div className="logout-button-container">
        <LogoutButton />
      </div>
      <div className="overlay"></div>

      <div className="content-container">
        <h1 className="page-title">Available Products</h1>
        {error && <p className="error-message">{error}</p>}

        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img 
        src={product.imageURL} 
        alt={product.name} 
        className="product-image"
        onError={(e) =>{ e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'block';}} // fallback image if broken URL
      />
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
