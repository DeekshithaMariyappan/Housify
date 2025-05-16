import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SellerDashboard from "./pages/SellerDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import AddHouseForm from "./pages/AddHouseForm";
import BuyHouse from "./pages/BuyHouse";
import SellerProfile from "./pages/SellerProfile";
import BuyerProfile from "./pages/BuyerProfile";
import RentedHouses from "./pages/RentedHouses";
import "./styles/glass.css";

// ProtectedRoute Component to handle role-based access
function ProtectedRoute({ children, allowedRoles }) {
  const role = localStorage.getItem("role");
  if (allowedRoles.includes(role)) {
    return children;
  }
  return <Navigate to="/" />;
}

function App() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  // Check if the role is loaded, if not, show a loading state or direct them to login
  if (role === null) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Seller Routes */}
        <Route
          path="/seller/dashboard"
          element={
            <ProtectedRoute allowedRoles={["seller"]}>
              <SellerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/profile"
          element={
            <ProtectedRoute allowedRoles={["seller"]}>
              <SellerProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-house"
          element={
            <ProtectedRoute allowedRoles={["seller"]}>
              <AddHouseForm />
            </ProtectedRoute>
          }
        />

        {/* Protected Buyer Routes */}
        <Route
          path="/buyer/dashboard"
          element={
            <ProtectedRoute allowedRoles={["buyer"]}>
              <BuyerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/buyer/profile"
          element={
            <ProtectedRoute allowedRoles={["buyer"]}>
              <BuyerProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/buy-house/:id"
          element={
            <ProtectedRoute allowedRoles={["buyer"]}>
              <BuyHouse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/buyer/rented"
          element={
            <ProtectedRoute allowedRoles={["buyer", "seller"]}>
              <RentedHouses />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
