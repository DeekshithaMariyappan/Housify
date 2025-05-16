import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, userType }) {
  const isLoggedIn = localStorage.getItem(userType);
  return isLoggedIn ? children : <Navigate to="/" />;
}

export default ProtectedRoute;