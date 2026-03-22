require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = process.env.MONGO_URL;

mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.log("MongoDB error:", err));

// Simple test route
app.get("/", (req, res) => {
  res.send("ZamMarket backend is running 🚀");
});

// Example schema
const OrderSchema = new mongoose.Schema({
  name: String,
  product: String,
  location: String
});

const Order = mongoose.model("Order", OrderSchema);

// Add order
app.post("/add-order", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.json({ message: "Order saved successfully ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all orders
app.get("/orders", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

// PORT (VERY IMPORTANT FOR RENDER)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running 🚀"));
