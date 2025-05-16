import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/glass.css";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    role: "buyer",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async () => {
    const { name, email, contact, password, role } = form;

    if (!name || !email || !contact || !password) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred during signup.");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", alignItems: "center" }}>
      <div style={{ flex: 1, textAlign: "center", padding: "20px" }}>
        <h1 style={{ fontSize: "3rem", color: "black" }}>HOUSIFY</h1>
        <p style={{ fontSize: "1.5rem", color: "#555" }}>"Your journey to a perfect home starts here."</p>
      </div>
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div className="glass-container" style={{ width: "300px" }}>
          <h2>Signup</h2>
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} /><br />
          <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} /><br />
          <input name="contact" placeholder="Contact" value={form.contact} onChange={handleChange} /><br />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} /><br />
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select><br />
          <button onClick={handleSignup}>Signup</button>
          <p style={{ marginTop: "10px" }}>
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
