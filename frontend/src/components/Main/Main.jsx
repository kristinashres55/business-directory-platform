import React from "react";
import "./Main.css";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div className="main-page">
      <div className="card-container">
        <div className="card">
          <h2 className="card-title">Browse Businesses</h2>
          <p className="card-text">
            View profiles and services offfered by verified businesses.
          </p>
          <Link to="/businesses" className="card-link">
            <button className="card-button primary">Explore</button>
          </Link>
        </div>

        <div className="card">
          <h2 className="card-title">Browse Products</h2>
          <p className="card-text">
            Browse a vast selection of products from various businesses.
          </p>
          <Link to="/businesses" className="card-link">
            <button className="card-button primary">Explore</button>
          </Link>
        </div>

        <div className="card">
          <h2 className="card-title">Add Your Business</h2>
          <p className="card-text">
            Register your company to showcase services and track financial
            growth.
          </p>
          <button className="card-button secondary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Main;
