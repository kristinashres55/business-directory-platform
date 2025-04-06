import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BusinessList.css";

const BusinessList = () => {
  const [filters, setFilters] = useState({
    type: "",
    location: "",
    minRevenue: "",
    cagrMin: "",
  });

  const [businesses, setBusinesses] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const fetchBusinesses = async () => {
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await axios.get(
        `http://localhost:5000/api/businesses/search?${query}`
      );
      setBusinesses(res.data);
    } catch (err) {
      console.error("Failed to fetch businesses:", err);
    }
  };

  useEffect(() => {
    fetchBusinesses(); // fetch default on page load
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBusinesses();
  };

  return (
    <div className="business-list-container">
      <h2>Explore Businesses</h2>

      <form className="filter-form" onSubmit={handleSearch}>
        <select name="type" value={filters.type} onChange={handleChange}>
          <option value="">All Types</option>
          <option value="Corporation">Corporation</option>
          <option value="Private">Private</option>
          <option value="Partnership">Partnership</option>
        </select>

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleChange}
        />

        <input
          type="number"
          name="minRevenue"
          placeholder="Min Revenue"
          value={filters.minRevenue}
          onChange={handleChange}
        />

        <input
          type="number"
          name="cagrMin"
          placeholder="Min CAGR"
          value={filters.cagrMin}
          onChange={handleChange}
        />

        <button type="submit">Search</button>
      </form>

      <div className="business-card-grid">
        {businesses.length === 0 ? (
          <p>No businesses found matching your filters.</p>
        ) : (
          businesses.map((business) => (
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
              <p>
                <strong>Total Revenue:</strong> $
                {business.totalRevenue?.toLocaleString() || 0}
              </p>
              <p>
                <strong>CAGR:</strong> {business.financials?.cagr || 0}%
              </p>
              <a href={`/businesses/${business._id}`}>View Profile</a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BusinessList;
