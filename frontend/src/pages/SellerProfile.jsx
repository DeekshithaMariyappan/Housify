import React, { useState, useEffect, useRef } from "react";
import "../styles/glass.css";
import { Pencil } from "react-bootstrap-icons";

function SellerProfile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    contact: "",
    image: "",
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    // Always use the latest logged-in user info for profile
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setProfile({
        name: currentUser.name || "",
        email: currentUser.email || "",
        contact: currentUser.contact || "",
        image: "",
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile((prev) => ({ ...prev, image: reader.result }));
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSave = () => {
    localStorage.setItem("sellerProfile", JSON.stringify(profile));
    alert("Profile updated!");
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div className="glass-container" style={{ width: "400px", padding: "20px" }}>
        <h2>Seller Profile</h2>
        <div className="profile-image-wrapper">
          {profile.image ? (
            <>
              <img
                src={profile.image}
                alt="Profile"
                className="profile-image"
              />
              <button
                className="edit-image-btn"
                onClick={() => fileInputRef.current.click()}
              >
                <Pencil size={16} />
              </button>
            </>
          ) : (
            <>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
              />
              <span style={{ color: '#888', fontSize: '0.95em' }}></span>
            </>
          )}
        </div>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <br />
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <br />
        <input
          type="text"
          name="contact"
          value={profile.contact}
          onChange={handleChange}
          placeholder="Contact"
        />
        <br />
        <button onClick={handleSave}>Save</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default SellerProfile;
