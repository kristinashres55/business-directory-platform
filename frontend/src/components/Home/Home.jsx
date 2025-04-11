import React from "react";
import "./Home.css";
import illustration from "../../assets/main.svg"; // use your own image

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-left">
          <h1 className="home-title">Welcome to the Business Directory</h1>
          <p className="home-description">
            A platform designed to connect users with businesses and facilitate
            financial transactions. Our directory is user-friendly and secure,
            ensuring a seamless experience for all users.
          </p>
          <button className="cta-button">
            <a href="#business-list-page"> Explore more</a>
          </button>
        </div>
        <div className="home-right">
          <img src={illustration} alt="Marketing Illustration" />
        </div>
      </div>
    </div>
  );
};

export default Home;
