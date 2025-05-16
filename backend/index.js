const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const House = require('./models/House');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB connection successful");
})
.catch((err) => {
  console.error("MongoDB connection failed:", err);
});

// Signup Route
app.post('/signup', async (req, res) => {
  const { name, email, contact, password, role } = req.body;

  if (!name || !email || !contact || !password || !role) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existingUser = await User.findOne({ email, role });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email and role." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, contact, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: "Signup successful!" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Login Route with debug logs
app.post('/login', async (req, res) => {
  const { email, password, role } = req.body;
  console.log("Login attempt:", { email, role });

  if (!email || !password || !role) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const user = await User.findOne({ email, role });
    console.log("User found:", !!user);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials or user not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials or user not found." });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post('/add-house', async (req, res) => {
  console.log("Received house data:", req.body);
  const { title, location, price, status, image, sellerName, sellerContact } = req.body;

  if (!title || !location || !price || !sellerName || !sellerContact) {
    return res.status(400).json({ message: "All required fields must be provided." });
  }

  try {
    const newHouse = new House({
      title,
      location,
      price,
      status,
      image,
      sellerName,
      sellerContact
    });

    await newHouse.save();
    res.status(201).json({ message: "House added successfully!" });
  } catch (err) {
    console.error("Error adding house:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to fetch all houses
app.get('/houses', async (req, res) => {
  try {
    const houses = await House.find();
    res.status(200).json(houses);
  } catch (err) {
    console.error("Error fetching houses:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to handle house purchase
app.post('/houses/:id/purchase', async (req, res) => {
  const { id } = req.params;
  const { paymentMethod, buyerName, buyerContact } = req.body;

  if (!paymentMethod || !buyerName || !buyerContact) {
    return res.status(400).json({ message: "Payment method and buyer details are required." });
  }

  try {
    const house = await House.findById(id);

    if (!house) {
      return res.status(404).json({ message: "House not found." });
    }

    if (house.status !== "available") {
      return res.status(400).json({ message: "House is not available for purchase." });
    }

    // Update house status to "not available" and add buyer details
    house.status = "not available";
    house.buyerName = buyerName;
    house.buyerContact = buyerContact;
    await house.save();

    res.status(200).json({ message: "Payment successful! House purchased.", house });
  } catch (err) {
    console.error("Error processing purchase:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Test route
app.get('/', (req, res) => {
  res.send("API is working");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
