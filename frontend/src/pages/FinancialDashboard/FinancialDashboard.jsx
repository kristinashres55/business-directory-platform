import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";
import "./FinancialDashboard.css";
import { useAuth } from "../../hooks/useAuth";
import image from "../../assets/homepage.svg";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);

export default function FinancialDashboard() {
  const { user, token } = useAuth();
  const [financials, setFinancials] = useState(null);
  const [error, setError] = useState("");

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
        console.log("Fetched Financial Data:", res.data);
        setFinancials(res.data);
      } catch (err) {
        console.error("Error fetching financials", err);
        setError("Unable to fetch financial data.");
      }
    };

    if (user && token) {
      fetchFinancials();
    }
  }, [user, token]);

  if (error) return <div className="error">{error}</div>;
  if (!financials)
    return <div className="loading">Loading financial data...</div>;

  const { cagr, roi, profitMargin, customerRetentionRate, revenue } =
    financials;

  const barData = {
    labels: revenue.map((r) => r.year),
    datasets: [
      {
        label: "Revenue",
        data: revenue.map((r) => r.amount),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  const lineData = {
    labels: revenue.map((r) => r.year),
    datasets: [
      {
        label: "Revenue Trend",
        data: revenue.map((r) => r.amount),
        fill: false,
        borderColor: "#42a5f5",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="financial-dashboard">
      <div className="financial-content">
        <img src={image} alt="Marketing Illustration" />
      </div>
      <h2>Financial Dashboard</h2>

      <div className="chart-container">
        <div className="chart-card">
          <h4>Revenue Over Years</h4>
          <Bar data={barData} />
        </div>

        <div className="chart-card">
          <h4>Trend Analysis</h4>
          <Line data={lineData} />
        </div>
      </div>
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
}
