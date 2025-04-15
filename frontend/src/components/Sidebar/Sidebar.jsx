import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <div className="sidebar">
      <ul className="sidebar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/businesses">Browse Businesses</Link>
        </li>
        <li>
        {user?.role === "business" ? (
  
    <Link to="/products">My Products</Link>
  
) : (
  
    <Link to="/products">Products</Link>
  
)}
        </li>
        {user?.role === "business" && (
          <>
            <li>
              <Link to="/financials">View Statistics</Link>
            </li>
            <li>
              <Link to={`/businesses/${user._id}`}>My Business</Link>
            </li>
          </>
        )}
        
          <li>
            <Link to="/messages">Messages</Link>
          </li>
      
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
