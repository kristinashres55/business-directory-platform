import React from "react";
import "./Navbar.css";

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
          <button className="navbar-login">Login</button>
          <button className="navbar-signup">Sign Up</button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
