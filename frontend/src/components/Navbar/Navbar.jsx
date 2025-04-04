import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">Business Directory</div>
        <ul className="navbar-links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/services">Services</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
        <div className="navbar-actions">
          <Link to="/login">
            <button className="navbar-login">Login</button>
          </Link>
          <Link to="/register">
            <button className="navbar-signup">Sign Up</button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
