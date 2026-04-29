const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("name email role phone address");
    const formatted = users.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address,
    }));
    res.json(formatted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to load users" });
  }
});


router.patch("/:id", async (req, res) => {
  try {
    const { name, email, phone, address, bio } = req.body;
    
    let updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, address, bio },
      { new: true }
    ).select("-password");
    
    if (!updatedUser && email) {
      updatedUser = await User.findOneAndUpdate(
        { email: email.toLowerCase() },
        { name, phone, address, bio },
        { new: true }
      ).select("-password");
    }
    
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found in database" });
    }
    
    res.json(updatedUser);
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

module.exports = router;
