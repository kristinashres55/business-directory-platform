import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import image from "../../assets/image.png";

const Register = () => {
  const [formData, setFormData] = useState({
    accountType: "general", // Default to general
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    businessType: "",
    description: "",
    phone: "",
    location: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const {
      name,
      email,
      password,
      confirmPassword,
      businessType,
      description,
      phone,
      location,
      accountType,
    } = formData;

    // --- VALIDATION ---
    if (!name || name.length < 2) {
      setError("Name must be at least 2 characters.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (accountType === "business") {
      const phoneRegex = /^[0-9+\-()\s]{7,20}$/;
      if (!phone || !phoneRegex.test(phone)) {
        setError("Please enter a valid phone number.");
        return;
      }
      if (!businessType || !description || !location) {
        setError("All business fields are required.");
        return;
      }
    }

    try {
      const { confirmPassword, ...cleanedData } = formData;

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        { ...cleanedData, role: formData.accountType }
      );

      setSuccess("Registration successful! Please log in.");
      setFormData({
        accountType: "general",
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        businessType: "",
        description: "",
        phone: "",
        location: "",
      });
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-overlay">
        <div className="signup-card">
          <div className="signup-image-left">
            <img src={image} alt="signup illustration" />
          </div>

          <div className="signup-form">
            <img
              src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
              alt="user icon"
              className="user-icon"
            />
            <h2 className="signup-title">Sign Up</h2>

            <div className="tab-switch">
              <button
                className={formData.accountType === "general" ? "active" : ""}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, accountType: "general" }))
                }
              >
                General User
              </button>
              <button
                className={formData.accountType === "business" ? "active" : ""}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, accountType: "business" }))
                }
              >
                Business User
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

              {formData.accountType === "business" && (
                <>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select Type --</option>
                    <option value="Private">Private</option>
                    <option value="Corporation">Corporation</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Sole Proprietorship">
                      Sole Proprietorship
                    </option>
                    <option value="LLC">LLC</option>
                    <option value="Nonprofit">Nonprofit</option>
                  </select>
                  <input
                    type="text"
                    name="location"
                    placeholder="Business Location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                  <textarea
                    name="description"
                    placeholder="Short Description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="2"
                  />
                </>
              )}

              {error && <p className="error-text">{error}</p>}
              {success && <p className="success-text">{success}</p>}

              <button type="submit">Register</button>

              <p className="login-link">
                Already have an account? <a href="/login">Login</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
