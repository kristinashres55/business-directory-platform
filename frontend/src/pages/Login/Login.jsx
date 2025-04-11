import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { Link } from "react-router-dom";
import image from "../../assets/image.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
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

      setSuccess("Login successful! Redirecting...");

      // Store token (for protected routes)
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      console.log("Login successful:", response.data);
      // Redirect to dashboard (or role-specific page if needed)
      window.location.href = "/";
    } catch (err) {
      setError("Invalid email or password. Please try again.", err);
    }
  };

  return (
    <div className="login-page">
      <div className="login-overlay">
        <div className="login-card">
          <div className="login-image-left">
            <img src={image} alt="illustration" />
          </div>

          <div className="login-form">
            <img
              src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
              alt="user icon"
              className="user-icon"
            />

            <h2 className="login-title">Login</h2>

            <form onSubmit={handleLogin}>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="login-input"
                placeholder="Email"
                required
              />
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                autoComplete="on"
                className="login-input"
                placeholder="Password"
                required
              />

              <div className="remember-forgot">
                <a href="#">Forgot Password?</a>
              </div>

              <button type="submit">Log In</button>

              {error && <p className="error-text">{error}</p>}
              {success && <p className="success-text">{success}</p>}

              <p className="signup-link">
                Don't have an account? <a href="/register">Sign up</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
