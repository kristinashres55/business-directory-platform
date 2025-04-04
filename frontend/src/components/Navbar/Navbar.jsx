import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"; // create this if not done

const Navbar = () => {
  const { user, token } = useAuth();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">Business Directory</div>
        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>

          {user?.role === "business" && (
            <>
              <li>
                <Link to="/financials">Financials</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
            </>
          )}

          {user?.role === "general" && (
            <>
              <li>
                <Link to="/businesses">Browse Businesses</Link>
              </li>
              <li>
                <Link to="/messages">Messages</Link>
              </li>
            </>
          )}
        </ul>

        <div className="navbar-actions">
          {!token ? (
            <>
              <Link to="/login">
                <button className="navbar-login">Login</button>
              </Link>
              <Link to="/register">
                <button className="navbar-signup">Sign Up</button>
              </Link>
            </>
          ) : (
            <button className="navbar-login" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
