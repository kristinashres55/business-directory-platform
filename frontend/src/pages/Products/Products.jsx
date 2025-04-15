import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    availability: true,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const userInfo = JSON.parse(localStorage.getItem("user"));
        setUser(userInfo);

        const url =
          userInfo?.role === "business"
            ? `http://localhost:5000/api/products/business/${userInfo._id}`
            : `http://localhost:5000/api/products`;

        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAdd = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/products",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProducts((prev) => [...prev, res.data]);
      setShowAddModal(false);
      setFormData({ name: "", description: "", price: "", availability: true });
    } catch (err) {
      console.error("Add failed", err);
    }
  };

  const handleEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:5000/api/products/${currentProduct._id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProducts((prev) =>
        prev.map((p) => (p._id === currentProduct._id ? res.data : p))
      );
      setShowEditModal(false);
    } catch (err) {
      console.error("Edit failed", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const openEditModal = (product) => {
    setCurrentProduct(product);
    setFormData(product);
    setShowEditModal(true);
  };

  return (
    <div className="products-page">
      <h2 className="products-title">
        {user?.role === "business" ? "My Products" : "Explore Products"}
      </h2>

      {user?.role === "business" && (
        <button className="add-btn" onClick={() => setShowAddModal(true)}>
          + Add Product
        </button>
      )}

      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <div className="card-header">
              <h3>{product.name}</h3>
            </div>
            <hr style={{opacity: 0.4}} />
            <div className="card-body">
              <p style={{height: 60+"px"}}>{product.description}</p>
              <p>
                <strong>Price:</strong> ${product.price}
              </p>
              <p>
                <strong>Available:</strong>{" "}
                {product.availability ? "Yes" : "No"}
              </p>

              {user?.role === "general" && product.business?.name && (
                <>
                  <p className="business-ref">
                    <strong>Business:</strong> {product.business.name}
                  </p>
                  <button className="message-btn">Message Business</button>
                </>
              )}

              {user?.role === "business" && user._id === product.business && (
                <div className="product-actions">
                  <button onClick={() => openEditModal(product)}>✏️</button>
                  <button onClick={() => handleDelete(product._id)}>🗑️</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add Product</h3>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
            />
            <label>
              <input
                type="checkbox"
                name="availability"
                checked={formData.availability}
                onChange={handleChange}
              />
              Available
            </label>
            <div className="modal-buttons">
              <button onClick={handleAdd}>Add</button>
              <button onClick={() => setShowAddModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Product</h3>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
            />
            <label>
              <input
                type="checkbox"
                name="availability"
                checked={formData.availability}
                onChange={handleChange}
              />
              Available
            </label>
            <div className="modal-buttons">
              <button onClick={handleEdit}>Update</button>
              <button onClick={() => setShowEditModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
