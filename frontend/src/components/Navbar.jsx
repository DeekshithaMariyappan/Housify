import React from "react";
import { Link } from "react-router-dom";
import "../styles/glass.css";

function Navbar() {
  const isBuyer = localStorage.getItem("buyer") === "true";
  const isSeller = localStorage.getItem("seller") === "true";

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/"; // redirect to login
  };

  return (
    <nav className="navbar">
      <h2>House Rental</h2>
      <div className="navbar-links">
        {/* Show only if seller is logged in */}
        {isSeller && !isBuyer && (
          <>
            <Link to="/seller/dashboard">Seller Dashboard</Link>
            <Link to="/seller/profile">Seller Profile</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        )}

        {/* Show only if buyer is logged in */}
        {isBuyer && !isSeller && (
          <>
            <Link to="/buyer/dashboard">Buyer Dashboard</Link>
            <Link to="/buyer/profile">Buyer Profile</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
