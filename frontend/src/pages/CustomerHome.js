import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../api/api';
import LogoutButton from '../components/LogoutButton';

const CustomerHome = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const closeModal = () => setSelectedProduct(null);

   // Helper to convert base64 image
  const getImageSrc = (base64) => {
    return `data:image/jpeg;base64,${base64}`;
  };

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
            <div 
              key={product.id} 
              className="product-card" 
              onClick={() => setSelectedProduct(product)}
            >
              <img 
                src={getImageSrc(product.image_base64)}
                alt={product.name} 
                className="product-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <h2 className="product-name">{product.name}</h2>
              <p className="product-description">{product.description}</p>
              <p className="product-price">${product.price}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
  <>
    {console.log('Selected product:', selectedProduct)}
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closeModal}>×</button>

        <div className="modal-body">
          <div className="modal-image-container">
            <img 
              src={selectedProduct.imageURL} 
              alt={selectedProduct.name} 
              className="modal-image"
              onError={(e) => e.target.style.display = 'none'}
            />
          </div>
          <div className="modal-details">
            <h2 className="product-price">{selectedProduct.name}</h2>
            <p className="product-detail"><strong>Description:</strong> {selectedProduct.description}</p>
            <p className="product-detail"><strong>Brand:</strong> {selectedProduct.brand}</p>
            <p className="product-detail"><strong>Model Number:</strong> {selectedProduct.model_number}</p>
            <p className="product-detail"><strong>Specifications:</strong> {selectedProduct.specifications}</p>
            <p className="product-detail"><strong>Warranty:</strong> {selectedProduct.warranty}</p>
            <p className="product-detail"><strong>In Stock:</strong> {selectedProduct.stock_quantity}</p>
            <p className="product-detail"><strong>Rating:</strong> {selectedProduct.rating} ⭐</p>
            <p className="product-price"><strong>Price:</strong> ${selectedProduct.price}</p>
          </div>
        </div>
      </div>
    </div>
  </>
)}


    </div>
  );
};

export default CustomerHome;
