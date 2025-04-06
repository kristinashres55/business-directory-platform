import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./BusinessList.css";

const BusinessList = () => {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/businesses");
        const filtered = res.data.filter((b) => b.role === "business");
        setBusinesses(filtered);
      } catch (err) {
        console.error("Failed to fetch businesses:", err);
      }
    };

    fetchBusinesses();
  }, []);

  return (
    <div className="business-list-container">
      <h2>Explore Verified Businesses</h2>
      <div className="business-cards">
        {businesses.map((business) => (
          <div className="business-card" key={business._id}>
            <h3>{business.name}</h3>
            <p>
              <strong>Type:</strong> {business.businessType}
            </p>
            <p>
              <strong>Location:</strong> {business.location}
            </p>
            <p>
              <strong>Description:</strong> {business.description}
            </p>
            <Link to={`/businesses/${business._id}`}>View Profile</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessList;
