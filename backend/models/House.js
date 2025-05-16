const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, default: "available" },
  image: { type: String }, // base64 or image URL
  sellerName: { type: String, required: true },
  sellerContact: { type: String, required: true },
  buyerName: { type: String, default: null },
  buyerContact: { type: String, default: null }
});

module.exports = mongoose.model("House", houseSchema);
