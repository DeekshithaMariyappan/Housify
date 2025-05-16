import React, { useEffect, useState } from "react";
import "../styles/glass.css";

function RentedHouses() {
  const [rented, setRented] = useState([]);

  useEffect(() => {
    const fetchRentedHouses = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (!currentUser) return;
        const res = await fetch("http://localhost:3001/houses");
        const data = await res.json();
        if (res.ok) {
          // Show rented houses where the user is either the seller or the buyer
          const rentedHouses = data.filter(
            (house) =>
              house.status === "not available" &&
              ((house.sellerName === currentUser.name && house.sellerContact === currentUser.contact) ||
               (house.buyerName === currentUser.name && house.buyerContact === currentUser.contact))
          );
          setRented(rentedHouses);
        } else {
          console.error("Error fetching rented houses:", data.message);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchRentedHouses();
  }, []);

  return (
    <div className="container glass-container" style={{ marginTop: "80px" }}>
      <h2>Rented Houses</h2>
      {rented.length === 0 ? (
        <p>No rented houses yet.</p>
      ) : (
        rented.map((house) => (
          <div key={house._id || house.id} className="house-card">
            <h3>{house.title}</h3>
            <p><strong>Location:</strong> {house.location}</p>
            <p><strong>Price:</strong> ₹{house.price}</p>
            <p><strong>Status:</strong> {house.status}</p>
            <p><strong>Seller Name:</strong> {house.sellerName || "N/A"}</p>
            <p><strong>Seller Contact:</strong> {house.sellerContact || "N/A"}</p>
            <p><strong>Buyer Name:</strong> {house.buyerName || "N/A"}</p>
            <p><strong>Buyer Contact:</strong> {house.buyerContact || "N/A"}</p>
            {house.image && (
              <img
                src={house.image}
                alt={house.title}
                style={{ width: "100%", borderRadius: "10px" }}
              />
            )}
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default RentedHouses;
