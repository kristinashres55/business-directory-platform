import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

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

  return (
    <div className="products-main">
      <div className="products-page">
        <h2 className="products-title">Our Products & Services</h2>

        {error && <p className="error-msg">{error}</p>}

        {products.length === 0 ? (
          <p>You haven't added any products yet.</p>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
