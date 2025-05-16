import React, { useState } from "react";
import "../styles/glass.css";

function AddHouseForm() {
  const [house, setHouse] = useState({
    title: "",
    location: "",
    price: "",
    status: "available",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHouse((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setHouse((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file); // Convert image to base64 string
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Fetch seller info from backend (currentUser in localStorage)
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      alert("Seller profile not found. Please log in again.");
      return;
    }

    const newHouse = {
      ...house,
      sellerName: currentUser.name,
      sellerContact: currentUser.contact,
    };

    try {
      const res = await fetch("http://localhost:3001/add-house", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newHouse),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message || "House added successfully!");
        setHouse({ title: "", location: "", price: "", status: "available", image: null });
      } else {
        alert(data.message || "Error adding house");
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Something went wrong while submitting the house.");
    }
  };

  return (
    <div className="container glass-container">
      <h2>Add House for Rent</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="House Title"
          value={house.title}
          onChange={handleChange}
          required
        /><br />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={house.location}
          onChange={handleChange}
          required
        /><br />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={house.price}
          onChange={handleChange}
          required
        /><br />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          required
        /><br />
        <button type="submit">Add House</button>
      </form>
    </div>
  );
}

export default AddHouseForm;
