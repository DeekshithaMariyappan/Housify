import React, { useEffect, useState } from "react";
import BuyerNavbar from "../components/BuyerNavbar"; 
import { Link } from "react-router-dom";
import "../styles/glass.css";

function BuyerDashboard() {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const res = await fetch("http://localhost:3001/houses");
        const data = await res.json();
        if (res.ok) {
          const available = data.filter((house) => house.status === "available");
          setHouses(available);
        } else {
          console.error("Error fetching houses:", data.message);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchHouses();
  }, []);

  return (
    <>
    <BuyerNavbar />
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", minHeight: "100vh", padding: "20px", marginTop: "70px" }}>
      {houses.length === 0 ? (
        <p>No houses available</p>
      ) : (
        houses.map((house) => (
          <div key={house.id} className="house-card" style={{ maxWidth: "600px", width: "100%", marginBottom: "20px" }}>
            <h3>{house.title}</h3>
            <p>Location: {house.location}</p>
            <p>Price: ₹{house.price}</p>
            {house.image && <img src={house.image} alt={house.title} style={{ width: "100%", borderRadius: "10px" }} />}
            <Link to={`/buy-house/${house._id}`}><button>Buy</button></Link>
          </div>
        ))
      )}
    </div>
    </>
  );
}

export default BuyerDashboard;