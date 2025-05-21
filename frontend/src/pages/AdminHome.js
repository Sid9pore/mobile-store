import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updatedProduct, createProduct,fetchAdminProducts,deleteProduct } from '../api/api';
import LogoutButton from '../components/LogoutButton';
import { useSelector } from 'react-redux';

const AdminHome = () => {
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '' });
  const [products, setProducts] = useState([]);
  const { adminId } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      console.log(adminId);
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
      const created = await createProduct(
        {
          name: newProduct.name,
          price: Number(newProduct.price),
          description: newProduct.description,
        },
        token
      );
      setProducts([...products, created]);
      setNewProduct({ name: '', price: '', description: '' });
    } catch (err) {
      alert('Failed to create product');
    }
  };

  const handleUpdateProduct = async (id, updatedProduct) => {
    try {
      const updated = await updateProduct(id, updatedProduct, token);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? updated : p))
      );
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
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
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
          <h2>Create Product</h2>
          <input
            type="text"
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          />
          <button onClick={handleCreateProduct}>+ Create Product</button>
        </div>

        <table className="products-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) => handleProductChange(product.id, 'name', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={product.price}
                    onChange={(e) => handleProductChange(product.id, 'price', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={product.description}
                    onChange={(e) =>
                      handleProductChange(product.id, 'description', e.target.value)
                    }
                  />
                </td>
                <td>
                  <button onClick={() => handleUpdateProduct(product.id, product)}>
                    Edit & Save
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminHome;
