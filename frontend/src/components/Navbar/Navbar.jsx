import React, { useState, useRef, useEffect } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const { user, token } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleProfile = () => {
    if (user?.role === "business") {
      navigate(`/businesses/${user._id}`);
    } else {
      navigate(`/users/${user._id}`);
    }
  };

  const getInitials = () => {
    return user?.name?.charAt(0).toUpperCase() || "U";
  };

  // 🔒 Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate("/")}>
        Business Directory
      </div>

      <div className="navbar-right" ref={dropdownRef}>
        {token && user ? (
          <div className="profile-dropdown">
            <div className="profile-icon" onClick={toggleDropdown}>
              {getInitials()}
            </div>

            {dropdownOpen && (
              <div className="dropdown-content">
                <div className="user-details">
                  <strong>{user.name}</strong>
                  <p>{user.email}</p>
                  <span>{user.role}</span>
                </div>
                <hr />
                <button className="dropdown-btn" onClick={handleProfile}>
                  Profile
                </button>
                <button className="dropdown-btn logout" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className="navbar-login" onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
