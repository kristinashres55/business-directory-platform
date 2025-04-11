import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./BusinessProfile.css";

const BusinessProfile = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:5000/api/businesses/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBusiness(res.data);
        setFormData(res.data); // for editing
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:5000/api/businesses/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBusiness(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update business:", err);
      alert("Update failed.");
    }
  };

  if (error)
    return <div style={{ padding: "2rem", color: "red" }}>{error}</div>;
  if (!business) return <div style={{ padding: "2rem" }}>Loading...</div>;

  return (
    <div className="business-profile">
      <div className="profile-banner">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1995/1995515.png"
          alt="Business Avatar"
          className="business-avatar"
        />
        <h2>
          {isEditing ? (
            <input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          ) : (
            business.name
          )}
        </h2>
        <p className="type-tag">{business.businessType}</p>
      </div>
      <div className="profile-card">
        <h2>
          {isEditing ? (
            <input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          ) : (
            business.name
          )}
        </h2>

        <p>
          <strong>Type:</strong>{" "}
          {isEditing ? (
            <input
              name="businessType"
              value={formData.businessType}
              onChange={handleInputChange}
            />
          ) : (
            business.businessType
          )}
        </p>
        <p>
          <strong>Description:</strong>{" "}
          {isEditing ? (
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          ) : (
            business.description
          )}
        </p>
        <p>
          <strong>Location:</strong>{" "}
          {isEditing ? (
            <input
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            />
          ) : (
            business.location
          )}
        </p>

        {isEditing ? (
          <>
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        )}

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
