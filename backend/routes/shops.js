const express = require("express");
const Shop = require("../models/Shop");
const router = express.Router();

// Create a new shop
router.post("/", async (req, res) => {
  try {
    const { name, seller, description, tags, distanceKm, etaMin } = req.body;
    const newShop = new Shop({
      name,
      seller,
      description,
      tags,
      distanceKm,
      etaMin,
    });
    const savedShop = await newShop.save();
    res.status(201).json(savedShop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all shops
router.get("/", async (req, res) => {
  try {
    const shops = await Shop.find().populate("seller", "name");
    res.json(shops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get shops by seller
router.get("/seller/:sellerId", async (req, res) => {
  try {
    const shops = await Shop.find({ seller: req.params.sellerId });
    res.json(shops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get shop by ID
router.get("/:id", async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id).populate("seller", "name");
    if (!shop) return res.status(404).json({ message: "Shop not found" });
    res.json(shop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update shop
router.patch("/:id", async (req, res) => {
  try {
    const updatedShop = await Shop.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedShop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
