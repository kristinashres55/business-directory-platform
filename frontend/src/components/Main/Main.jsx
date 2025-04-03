import React from "react";
import "./Main.css";

const Main = () => {
  return (
    <div className="main-page">
      <div className="card-container">
        <div className="card">
          <h2 className="card-title">Browse Businesses</h2>
          <p className="card-text">
            View profiles, services, and financials of verified businesses.
          </p>
          <button className="card-button primary">Explore</button>
        </div>

        <div className="card">
          <h2 className="card-title">Add Your Business</h2>
          <p className="card-text">
            Register your company to showcase services and track financial
            growth.
          </p>
          <button className="card-button secondary">Get Started</button>
        </div>

        <div className="card">
          <h2 className="card-title">Connect & Message</h2>
          <p className="card-text">
            Use the platform to contact businesses or other users securely.
          </p>
          <button className="card-button outline">Start Messaging</button>
        </div>
      </div>
    </div>
  );
};

export default Main;
