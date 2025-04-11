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
  const [showAll, setShowAll] = useState(false); // control how many to show

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const fetchBusinesses = async (customFilters = filters) => {
    try {
      const token = localStorage.getItem("token");
      const query = new URLSearchParams(customFilters).toString();

      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {}; // no headers if not logged in

      const res = await axios.get(
        `http://localhost:5000/api/businesses/search?${query}`,
        config
      );

      setBusinesses(res.data);
    } catch (err) {
      console.error("Failed to fetch businesses:", err);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setShowAll(false); // reset when new search happens
    fetchBusinesses();
  };

  const handleReset = () => {
    const resetFilters = {
      type: "",
      location: "",
      minRevenue: "",
      cagrMin: "",
    };

    setFilters(resetFilters);
    setShowAll(false);
    fetchBusinesses(resetFilters);
  };

  const visibleBusinesses = showAll ? businesses : businesses.slice(0, 4);

  return (
    <div className="business-list-page" id="business-list-page">
      <div className="business-list-container">
        <h2 className="section-title">Explore Businesses</h2>
        <p className="section-subtitle">
          Connect with listed businesses. Filter by type, revenue, and location.
        </p>

        <form className="filter-form" onSubmit={handleSearch}>
          <div className="form-group">
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
            <button type="button" onClick={handleReset} className="reset-btn">
              Reset
            </button>
          </div>
        </form>

        <div className="business-card-grid">
          {visibleBusinesses.length === 0 ? (
            <p>No businesses found.</p>
          ) : (
            visibleBusinesses.map((business) => (
              <div className="business-card fancy" key={business._id}>
                <img
                  className="card-icon"
                  src="https://cdn-icons-png.flaticon.com/512/4762/4762314.png"
                  alt="Business Icon"
                />
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
                <a href={`/businesses/${business._id}`}>Read More →</a>
              </div>
            ))
          )}
        </div>

        {businesses.length > 4 && (
          <div className="center-btn">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="view-more-btn"
            >
              {showAll ? "View Less" : "View More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessList;
