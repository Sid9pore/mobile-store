import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createProduct,
  fetchAdminProducts,
  deleteProduct,
  updateProduct,
} from "../api/api";
import LogoutButton from "../components/LogoutButton";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    brand: "",
    model_number: "",
    specifications: "",
    warranty: "",
    stock_quantity: "",
    rating: "",
    imageFile: null,
  });

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState("");
  const { adminId } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const products = await fetchAdminProducts(adminId);
      setProducts(products);
    } catch (err) {
      setError("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [adminId]);

  const handleCreateProduct = async () => {
    try {
      if (!newProduct.name.trim() || !newProduct.price) {
        alert("Please fill product name and price");
        return;
      }

      // Helper: Convert file to base64
      const toBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            const base64String = reader.result.split(",")[1]; // remove "data:image/...;base64,"
            resolve(base64String);
          };
          reader.onerror = (error) => reject(error);
        });
      };

      let imageData = null;
      if (newProduct.imageFile) {
        imageData = await toBase64(newProduct.imageFile);
      }
      console.log(adminId);

      const payload = {
        name: newProduct.name,
        description: newProduct.description,
        brand: newProduct.brand,
        model_number: newProduct.model_number,
        specifications: newProduct.specifications,
        warranty: newProduct.warranty,
        stock_quantity: parseInt(newProduct.stock_quantity || "0", 10),
        rating: parseFloat(newProduct.rating || "0"),
        price: parseFloat(newProduct.price),
        created_by_id: parseFloat(adminId),
        image_data: imageData,
      };
      console.log(payload);

      await createProduct(payload); // raw JSON post
      await fetchProducts(); // Refresh product list

      // Reset form
      setNewProduct({
        name: "",
        price: "",
        description: "",
        brand: "",
        model_number: "",
        specifications: "",
        warranty: "",
        stock_quantity: "",
        rating: "",
        imageFile: null,
      });
    } catch (err) {
      console.error("Failed to create product:", err);
      alert("Failed to create product");
    }
  };

  const handleUpdateProduct = async (id, product) => {
    try {
      const formData = new FormData();
      Object.entries(product).forEach(([key, value]) => {
        if (value && key !== "imageFile" && key !== "image_data") {
          formData.append(key, value);
        }
      });

      if (product.imageFile) {
        formData.append("image", product.imageFile);
      }

      const updated = await updateProduct(id, formData, token);
      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    } catch (err) {
      alert("Failed to update product");
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await deleteProduct(id, token);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setSelectedProduct(null);
    } catch (err) {
      alert("Failed to delete product");
    }
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
            type="text"
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Brand"
            value={newProduct.brand}
            onChange={(e) =>
              setNewProduct({ ...newProduct, brand: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Model Number"
            value={newProduct.model_number}
            onChange={(e) =>
              setNewProduct({ ...newProduct, model_number: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Specifications"
            value={newProduct.specifications}
            onChange={(e) =>
              setNewProduct({ ...newProduct, specifications: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Warranty"
            value={newProduct.warranty}
            onChange={(e) =>
              setNewProduct({ ...newProduct, warranty: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Stock Quantity"
            value={newProduct.stock_quantity}
            onChange={(e) =>
              setNewProduct({ ...newProduct, stock_quantity: e.target.value })
            }
          />
          <input
            type="number"
            step="0.1"
            placeholder="Rating"
            value={newProduct.rating}
            onChange={(e) =>
              setNewProduct({ ...newProduct, rating: e.target.value })
            }
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setNewProduct({ ...newProduct, imageFile: e.target.files[0] })
            }
          />
          <button className="form-button" onClick={handleCreateProduct}>
            + Create Product
          </button>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => setSelectedProduct(product)}
            >
              {product.image_data && (
                <img
                  className="product-image"
                  src={`data:image/jpeg;base64,${product.image_data}`}
                  alt={product.name}
                />
              )}
              <div className="product-info">
                <div className="product-name">{product.name}</div>
                <div className="product-price">${product.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Product</h2>
            <input
              type="text"
              value={selectedProduct.name}
              onChange={(e) =>
                setSelectedProduct({ ...selectedProduct, name: e.target.value })
              }
            />
            <textarea
              value={selectedProduct.description}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  description: e.target.value,
                })
              }
            />
            <input
              type="text"
              value={selectedProduct.brand}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  brand: e.target.value,
                })
              }
            />
            <input
              type="text"
              value={selectedProduct.model_number}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  model_number: e.target.value,
                })
              }
            />
            <input
              type="text"
              value={selectedProduct.specifications}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  specifications: e.target.value,
                })
              }
            />
            <input
              type="text"
              value={selectedProduct.warranty}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  warranty: e.target.value,
                })
              }
            />
            <input
              type="number"
              value={selectedProduct.stock_quantity}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  stock_quantity: e.target.value,
                })
              }
            />
            <input
              type="number"
              step="0.1"
              value={selectedProduct.rating}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  rating: e.target.value,
                })
              }
            />
            <input
              type="number"
              value={selectedProduct.price}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  price: e.target.value,
                })
              }
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  imageFile: e.target.files[0],
                })
              }
            />
            <div className="modal-actions">
              <button
                className="save-btn"
                onClick={() => {
                  handleUpdateProduct(selectedProduct.id, selectedProduct);
                  setSelectedProduct(null);
                }}
              >
                Save Changes
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDeleteProduct(selectedProduct.id)}
              >
                Delete Product
              </button>
              <button
                className="close-btn"
                onClick={() => setSelectedProduct(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHome;
