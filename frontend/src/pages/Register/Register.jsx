import React, { useState } from "react";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const [role, setRole] = useState("general");
  const [formData, setFormData] = useState({
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
    setFormData((prevData) => ({
      ...prevData,
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
    } = formData;

    // --- VALIDATION ---
    if (!name || name.length < 2) {
      setError("Name is required and must be at least 2 characters.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (role === "business") {
      const phoneRegex = /^[0-9+\-()\s]{7,20}$/;
      if (!phone || !phoneRegex.test(phone)) {
        setError("Please enter a valid phone number.");
        return;
      }
      if (!businessType) {
        setError("Business type is required.");
        return;
      }
      if (!description) {
        setError("Description is required.");
        return;
      }
      if (!location) {
        setError("Location is required.");
        return;
      }
    }

    try {
      // remove confirmPassword before sending
      const { confirmPassword, ...cleanedData } = formData;

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        { ...cleanedData, role }
      );

      setSuccess("Registration successful! Please log in.");
      setFormData({
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
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // will show: "Email is already registered."
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div>
      <div className="register-container">
        <div className="register-box">
          <h2>Create Account</h2>
          <form onSubmit={handleSubmit}>
            <label>User Type:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="general">General</option>
              <option value="business">Business</option>
            </select>

            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />

            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            {role === "business" && (
              <>
                <label>Business Type:</label>
                <input
                  type="text"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                />

                <label>Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>

                <label>Phone Number:</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />

                <label>Location:</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </>
            )}

            {error && <p className="error-text">{error}</p>}
            {success && <p className="success-text">{success}</p>}

            <button type="submit">Register</button>
            <p className="register-footer-text">
              Already have an account? <a href="/login">Login</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
