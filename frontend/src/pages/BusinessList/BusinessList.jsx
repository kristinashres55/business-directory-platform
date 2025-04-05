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
        {businesses.map((biz) => (
          <div className="business-card" key={biz._id}>
            <h3>{biz.name}</h3>
            <p>
              <strong>Type:</strong> {biz.businessType}
            </p>
            <p>
              <strong>Location:</strong> {biz.location}
            </p>
            <p>
              <strong>Description:</strong> {biz.description}
            </p>
            <Link to={`/businesses/${biz._id}`}>View Profile</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessList;
