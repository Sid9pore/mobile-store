import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createProduct,
  fetchAdminProducts,
  deleteProduct,
  updateProduct
} from '../api/api';
import LogoutButton from '../components/LogoutButton';
import { useSelector } from 'react-redux';

const AdminHome = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    imageFile: null,
  });
  const [products, setProducts] = useState([]);
  const { adminId } = useSelector((state) => state.auth);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      console.log(adminId);
      try {
        const products = await fetchAdminProducts(adminId);
        setProducts(products);
      } catch (err) {
        setError('Failed to fetch products');
      }
    };

    fetchProducts();
  }, [adminId]);

  const handleCreateProduct = async () => {
    try {
      if (!newProduct.name.trim() || !newProduct.price) {
        alert('Please fill product name and price');
        return;
      }

      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('price', newProduct.price);
      formData.append('description', newProduct.description);
      if (newProduct.imageFile) {
        formData.append('image', newProduct.imageFile);
      }

      const created = await createProduct(formData, token);
      setProducts([...products, created]);
      setNewProduct({ name: '', price: '', description: '', imageFile: null });
    } catch (err) {
      alert('Failed to create product');
    }
  };

  const handleUpdateProduct = async (id, product) => {
    try {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('price', product.price);
      formData.append('description', product.description);
      if (product.imageFile) {
        formData.append('image', product.imageFile);
      }

      const updated = await updateProduct(id, formData, token);
      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    } catch (err) {
      alert('Failed to update product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteProduct(id, token);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  const handleProductChange = (id, field, value) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      )
    );
  };

  const handleImageChange = (id, file) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, imageFile: file } : p
      )
    );
  };

  return (
    <div className="admin-home">
      <div className="logout-button-container">
        <LogoutButton />
      </div>

      <div className="content-container">
        <h1 className="page-title">Admin Dashboard</h1>
        {error && <p className="error-message">{error}</p>}

        <div className="create-product-form">
          <h2 className="section-title">Create Product</h2>
          <input
            className="form-input"
            type="text"
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <input
            className="form-input"
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
          <input
            className="form-input"
            type="text"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          />
          <input
            className="form-input"
            type="file"
            accept="image/*"
            onChange={(e) => setNewProduct({ ...newProduct, imageFile: e.target.files[0] })}
          />
          <button className="form-button" onClick={handleCreateProduct}>+ Create Product</button>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              {product.image_data && (
                <img
                  className="product-image"
                  src={`data:image/jpeg;base64,${product.image_data}`}
                  alt={product.name}
                />
              )}
              <input
                className="form-input"
                type="text"
                value={product.name}
                onChange={(e) => handleProductChange(product.id, 'name', e.target.value)}
              />
              <input
                className="form-input"
                type="number"
                value={product.price}
                onChange={(e) => handleProductChange(product.id, 'price', e.target.value)}
              />
              <input
                className="form-input"
                type="text"
                value={product.description}
                onChange={(e) => handleProductChange(product.id, 'description', e.target.value)}
              />
              <input
                className="form-input"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(product.id, e.target.files[0])}
              />
              <div className="product-actions">
                <button
                  className="form-button"
                  onClick={() => handleUpdateProduct(product.id, product)}
                >
                  Edit & Save
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AdminHome;
