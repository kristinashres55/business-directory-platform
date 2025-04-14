import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import "./DashboardLayout.css";

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content-area">
        <Navbar />
        <div className="dashboard-content">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
