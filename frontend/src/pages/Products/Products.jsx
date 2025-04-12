import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const isLandingPage = location.pathname === "/";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load your products. Please try again.");
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const visibleProducts = isLandingPage ? products.slice(0, 4) : products;

  return (
    <div className="products-main">
      <div className="products-page">
        <h2 className="products-title">Our Products & Services</h2>

        {error && <p className="error-msg">{error}</p>}

        {visibleProducts.length === 0 ? (
          <p>No products to display.</p>
        ) : (
          <div className="products-grid">
            {visibleProducts.map((product) => (
              <div className="product-card" key={product._id}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/7963/7963556.png"
                  alt="product"
                  className="product-icon"
                />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>
                  <strong>Price:</strong> ${product.price}
                </p>
                <p>
                  <strong>Available:</strong>{" "}
                  {product.availability ? "Yes" : "No"}
                </p>

                {!isLandingPage && (
                  <div className="product-buttons">
                    <button className="edit-btn">Edit</button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Bottom Button */}
        <div className="center-btn">
          {isLandingPage ? (
            <button className="view-more" onClick={() => navigate("/products")}>
              View More
            </button>
          ) : (
            <button
              className="add-btn"
              onClick={() => alert("Open Add Product Modal")}
            >
              + Add Product
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
