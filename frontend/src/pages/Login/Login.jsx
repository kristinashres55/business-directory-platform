import React, { useState } from "react";
import "./Login.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      // Store token (for protected routes)
      localStorage.setItem("token", response.data.token);
      console.log("Login successful:", response.data);
      // Redirect to dashboard (or role-specific page if needed)
      window.location.href = "/";
    } catch (err) {
      setError("Invalid email or password. Please try again.", err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="login-title">Login </h1>
        <form className="login-inputs" onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="login-input"
            placeholder="Email"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            autoComplete="on"
            className="login-input"
            placeholder="Password"
            required
          />
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        <div className="login-footer">
          <p className="login-footer-text">Don't have an account?</p>
          <button className="login-signup-button">Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
