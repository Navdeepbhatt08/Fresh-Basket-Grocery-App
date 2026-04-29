const express = require("express");
const Address = require("../models/Address");
const router = express.Router();

// Add a new address
router.post("/", async (req, res) => {
  try {
    const { email, name, phone, house, area, city, state, pincode, type } = req.body;
    
    const fullAddress = `${house}, ${area}, ${city}, ${state} - ${pincode} (${type})`;
    
    const newAddress = new Address({
      email: email.toLowerCase(),
      name,
      phone,
      house,
      area,
      city,
      state,
      pincode,
      type,
      fullAddress
    });
    
    const savedAddress = await newAddress.save();
    res.status(201).json(savedAddress);
  } catch (error) {
    console.error("Error saving address:", error);
    res.status(500).json({ error: "Failed to save address" });
  }
});


router.get("/:email", async (req, res) => {
  try {
    const addresses = await Address.find({ email: req.params.email.toLowerCase() }).sort({ createdAt: -1 });
    res.json(addresses);
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({ error: "Failed to fetch addresses" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Address.findByIdAndDelete(req.params.id);
    res.json({ message: "Address deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete address" });
  }
});

module.exports = router;
