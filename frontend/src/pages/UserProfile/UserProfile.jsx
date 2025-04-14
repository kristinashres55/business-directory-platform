// src/pages/UserProfile/UserProfile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(true); // starts in edit mode
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setFormData(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load user profile.");
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "http://localhost:5000/api/users/update",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error("Update failed:", err);
      alert("Update failed.");
    }
  };

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div className="user-profile">
      <div className="profile-card">
        <h2>Edit Profile</h2>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
        />
        <button onClick={handleUpdate}>Save Changes</button>
      </div>
    </div>
  );
};

export default UserProfile;
