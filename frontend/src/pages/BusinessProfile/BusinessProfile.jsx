import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./BusinessProfile.css";
import Navbar from "../../components/Navbar/Navbar";

const BusinessProfile = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/businesses/${id}`
        );
        setBusiness(response.data);
      } catch (err) {
        setError("Failed to load business profile.");
      }
    };

    fetchBusiness();
  }, [id]);

  if (error) return <div className="error">{error}</div>;
  if (!business) return <div>Loading...</div>;

  return (
    <div className="business-profile">
      <h2>{business.name}</h2>
      <p>
        <strong>Type:</strong> {business.businessType}
      </p>
      <p>
        <strong>Description:</strong> {business.description}
      </p>
      <p>
        <strong>Location:</strong> {business.contactDetails}
      </p>

      <h3>Offerings</h3>
      {business.products.length === 0 ? (
        <p>No products/services listed.</p>
      ) : (
        <ul>
          {business.products.map((product) => (
            <li key={product._id}>
              <strong>{product.name}</strong>: {product.description} ($
              {product.price})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BusinessProfile;
