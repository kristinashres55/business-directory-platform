import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./UserProfile.css";

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(userInfo);

    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setFormData(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setError("You must be logged in to view this profile.");
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:5000/api/users/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert("Update failed.");
    }
  };

  const isOwnProfile = currentUser && currentUser._id === id;

  if (error)
    return <div style={{ padding: "2rem", color: "red" }}>{error}</div>;
  if (!user) return <div style={{ padding: "2rem" }}>Loading...</div>;

  return (
    <div className="user-profile">
      <div className="profile-card">
        <img
          src={`https://ui-avatars.com/api/?name=${user.name}&background=041858&color=fff&rounded=true&size=100`}
          alt="avatar"
          className="profile-avatar"
        />
        <h2>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          ) : (
            user.name
          )}
        </h2>
        <p>
          <strong>Email:</strong>{" "}
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          ) : (
            user.email
          )}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>

        {isOwnProfile &&
          (isEditing ? (
            <div style={{alignItems: "center",margin: "1rem"}}>
              <button onClick={handleUpdate}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          ) : (
            <button style={{alignSelf:"center"}} onClick={() => setIsEditing(true)}>Edit Profile</button>
          ))}
      </div>
    </div>
  );
};

export default UserProfile;
