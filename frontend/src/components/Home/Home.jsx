import React from "react";
import homeImage from "../../assets/homepage.jpg";
import "./Home.css";

const Home = () => {
  return (
    <div className="homepage-image">
      <img src={homeImage} alt="Homepage" className="homepage-image" />
      <div className="homepage-desc">
        <h1 className="homepage-title">Welcome to the Business Directory</h1>
        <p className="homepage-description">
          A platform designed to connect users with businesses and facilitate
          financial transactions. Our directory is user-friendly and secure,
          ensuring a seamless experience for all users.
        </p>
      </div>
    </div>
  );
};

export default Home;
