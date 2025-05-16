import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/glass.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (res.ok) {
        // Save user and actual role returned from backend
        localStorage.setItem("currentUser", JSON.stringify(data.user));
        localStorage.setItem("role", data.user.role);  // ✅ Use role from DB

        // Navigate based on the returned user role
        if (data.user.role === "seller") {
          navigate("/seller/dashboard");
        } else if (data.user.role === "buyer") {
          navigate("/buyer/dashboard");
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", alignItems: "center" }}>
      <div style={{ flex: 1, textAlign: "center", padding: "20px" }}>
        <h1 style={{ fontSize: "3rem", color: "black" }}>HOUSIFY</h1>
        <p style={{ fontSize: "1.5rem", color: "#555" }}>"Find and Sell Your Dream Home with Ease and Confidence."</p>
      </div>
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div className="glass-container" style={{ width: "300px" }}>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /><br />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select><br />
          <button onClick={handleLogin}>Login</button>
          <p style={{ marginTop: "10px" }}>
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
