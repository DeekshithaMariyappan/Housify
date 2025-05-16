import React from "react";
import SellerNavbar from "../components/SellerNavbar";
import { Link, useNavigate } from "react-router-dom";
import "../styles/glass.css";

function SellerDashboard() {
  const seller = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <>
      {/* Seller Navbar */}
      <SellerNavbar />

      {/* Main Dashboard */}
      <div
        className="glass-container"
        style={{
          marginTop: "100px",
          padding: "30px",
          textAlign: "center",
        }}
      >
        <h2>Welcome, {seller?.name || "Seller"}!</h2>
        <p>Email: {seller?.email}</p>
        <p>Manage your rental listings below:</p>

        <Link to="/add-house">
          <button style={{ marginTop: "20px" }}>Add New House</button>
        </Link>

        <br /><br />
      </div>
    </>
  );
}

export default SellerDashboard;
