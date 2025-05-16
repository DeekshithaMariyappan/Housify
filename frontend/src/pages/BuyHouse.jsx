import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/glass.css";

function BuyHouse() {
  const { id } = useParams();
  const [house, setHouse] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHouse = async () => {
      try {
        const res = await fetch("http://localhost:3001/houses");
        const data = await res.json();
        if (res.ok) {
          const selected = data.find((h) => h._id === id);
          setHouse(selected);
        } else {
          console.error("Error fetching houses:", data.message);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchHouse();
  }, [id]);

  const handlePurchase = async () => {
    if (!window.confirm("Are you sure you want to proceed with payment on visit?")) return;

    try {
      // Always use the latest logged-in user info
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (!currentUser) {
        alert("User not found. Please log in again.");
        return;
      }

      // Update house status in the backend with buyer details
      const res = await fetch(`http://localhost:3001/houses/${id}/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethod: "cod",
          buyerName: currentUser.name,
          buyerContact: currentUser.contact,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("The house has been marked as not available.");
        navigate("/buyer/dashboard");
      } else {
        alert(data.message || "Error processing payment.");
      }
    } catch (err) {
      console.error("Purchase error:", err);
      alert("Something went wrong while processing the payment.");
    }
  };

  if (!house) return <div className="container glass-container">Loading...</div>;

  return (
    <div className="container glass-container" style={{ marginTop: "80px" }}>
      <h2>{house.title}</h2>
      <p><strong>Location:</strong> {house.location}</p>
      <p><strong>Price:</strong> ₹{house.price}</p>
      <p><strong>Status:</strong> {house.status}</p>
      {house.image && <img src={house.image} alt={house.title} style={{ width: "100%", borderRadius: "10px" }} />}

      <h3>Contact Seller</h3>
      <p><strong>Name:</strong> {house.sellerName}</p>
      <p><strong>Contact:</strong> {house.sellerContact}</p>

      <h3>Payment Method</h3>
      <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
        <option value="cod">Cash on Visit</option>
      </select>

      <br /><br />
      <button onClick={handlePurchase} disabled={house.status !== "available"}>
        Confirm Purchase
      </button>
    </div>
  );
}

export default BuyHouse;
