import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/glass.css";

function HouseCard({ house }) {
  const navigate = useNavigate();

  const handleBuy = () => {
    navigate(`/buy-house/${house.id}`);
  };

  if (house.status === "rented") return null;

  return (
    <div className="glass-container">
      <img src={house.image} alt="House" style={{ width: "100%", height: "200px" }} />
      <h3>{house.title}</h3>
      <p>{house.description}</p>
      <p>Price: {house.price}</p>
      <p>Status: {house.status}</p>
      <button onClick={handleBuy}>Buy</button>
    </div>
  );
}

export default HouseCard;