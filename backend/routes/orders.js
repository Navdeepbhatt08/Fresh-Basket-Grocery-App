const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

// Create a new order
router.post("/", async (req, res) => {
  try {
    const { buyer, seller, items, total, deliveryDetails, paymentMethod } = req.body;
    
    // Simple order ID generation
    const orderId = "ORD-" + Math.floor(1000 + Math.random() * 9000);
    
    const newOrder = new Order({
      orderId,
      buyer,
      seller,
      items,
      total,
      deliveryDetails,
      paymentMethod,
    });
    
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get orders for a buyer
router.get("/buyer/:buyerId", async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.params.buyerId })
      .populate("seller", "name")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get orders for a seller
router.get("/seller/:sellerId", async (req, res) => {
  try {
    const orders = await Order.find({ seller: req.params.sellerId })
      .populate("buyer", "name email phone")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update order status
router.patch("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
