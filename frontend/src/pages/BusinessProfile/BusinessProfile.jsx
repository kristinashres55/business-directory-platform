import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./BusinessProfile.css";

const BusinessProfile = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:5000/api/businesses/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBusiness(res.data);
      } catch (err) {
        console.error("Failed to fetch business:", err);
        setError("You must be logged in to view this business profile.");
      }
    };

    const fetchProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchBusiness();
    fetchProducts();
  }, [id]);

  if (error)
    return <div style={{ padding: "2rem", color: "red" }}>{error}</div>;
  if (!business) return <div style={{ padding: "2rem" }}>Loading...</div>;

  return (
    <div className="business-profile">
      <div className="profile-card">
        <h2>{business.name}</h2>
        <p>
          <strong>Type:</strong> {business.businessType}
        </p>
        <p>
          <strong>Description:</strong> {business.description}
        </p>
        <p>
          <strong>Location:</strong> {business.location}
        </p>

        <h3>Offerings</h3>
        {products.length > 0 ? (
          <ul>
            {products.map((product) => (
              <li key={product._id}>
                <strong>{product.name}</strong> - {product.description} ($
                {product.price}) {product.availability ? "✔" : "❌"}
              </li>
            ))}
          </ul>
        ) : (
          <p>No products/services listed.</p>
        )}
      </div>
    </div>
  );
};

export default BusinessProfile;
