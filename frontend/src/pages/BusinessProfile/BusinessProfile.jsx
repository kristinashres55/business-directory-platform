import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./BusinessProfile.css";
import Navbar from "../../components/Navbar/Navbar";

const BusinessProfile = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchBusiness = async () => {
      const res = await axios.get(`http://localhost:5000/api/businesses/${id}`);
      setBusiness(res.data);
    };

    const fetchProducts = async () => {
      const res = await axios.get(`http://localhost:5000/api/products/${id}`);
      setProducts(res.data);
    };

    fetchBusiness();
    fetchProducts();
  }, [id]);

  if (!business) return <div>Loading...</div>;

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
