import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FinancialDashboard.css"; // optional styling
import { useAuth } from "../../hooks/useAuth";

const FinancialDashboard = () => {
  const { user, token } = useAuth();
  const [financials, setFinancials] = useState(null);
  const [formData, setFormData] = useState({
    year: "",
    amount: "",
    cagr: "",
    profitMargin: "",
    roi: "",
    customerRetentionRate: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchFinancials = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/financials/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFinancials(res.data);
      } catch (err) {
        console.error("Failed to fetch financials:", err);
      }
    };

    if (user?.role === "business") {
      fetchFinancials();
    }
  }, [user, token]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddData = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:5000/api/financials`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFinancials(res.data.financials);
      setMessage("Financial data added successfully.");
    } catch (err) {
      console.error(err);
      setMessage("Failed to add data.");
    }
  };

  return (
    <div className="financial-dashboard">
      <h2>Financial Dashboard</h2>
      {message && <p className="message">{message}</p>}

      <form onSubmit={handleAddData} className="financial-form">
        <input
          type="number"
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Revenue Amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="cagr"
          placeholder="CAGR"
          value={formData.cagr}
          onChange={handleChange}
        />
        <input
          type="number"
          name="profitMargin"
          placeholder="Profit Margin"
          value={formData.profitMargin}
          onChange={handleChange}
        />
        <input
          type="number"
          name="roi"
          placeholder="ROI"
          value={formData.roi}
          onChange={handleChange}
        />
        <input
          type="number"
          name="customerRetentionRate"
          placeholder="Customer Retention Rate"
          value={formData.customerRetentionRate}
          onChange={handleChange}
        />
        <button type="submit">Add Financial Data</button>
      </form>

      {financials && (
        <div className="financial-details">
          <h3>Revenue Over Years:</h3>
          <ul>
            {financials.revenue.map((r) => (
              <li key={r._id}>
                {r.year}: ${r.amount.toLocaleString()}
              </li>
            ))}
          </ul>
          <p>CAGR: {financials.cagr}%</p>
          <p>Profit Margin: {financials.profitMargin}%</p>
          <p>ROI: {financials.roi}%</p>
          <p>Customer Retention Rate: {financials.customerRetentionRate}%</p>
        </div>
      )}
    </div>
  );
};

export default FinancialDashboard;
