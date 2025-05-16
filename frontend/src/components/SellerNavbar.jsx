import React from "react";
import { Link } from "react-router-dom";
import "../styles/glass.css";

function SellerNavbar() {
  const handleLogout = () => {
    localStorage.removeItem("seller");
    window.location.href = "/"; 
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center", 
        padding: "10px 20px", 
        width: "100%", 
        position: "fixed", 
        top: 0, 
        left: 0, 
        zIndex: 1000, 
        backgroundColor: "rgba(255, 255, 255, 0.8)", 
        boxSizing: "border-box", 
        borderRadius: "10px", 
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
      }}
    >
      {/* Left-aligned text "Housify" */}
      <div style={{ fontSize: "24px", fontWeight: "bold" }}>
        Housify
      </div>

      {/* Right-aligned links and logout */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link to="/seller/dashboard" style={{ marginRight: "15px" }}>
          Dashboard
        </Link>
        <Link to="/seller/profile" style={{ marginRight: "15px" }}>
          Profile
        </Link>
        <Link to="/buyer/rented" style={{ marginRight: "15px" }}>
          View Rented Houses
        </Link>
        <button onClick={handleLogout} style={{ padding: "5px 15px", cursor: "pointer" }}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default SellerNavbar;
