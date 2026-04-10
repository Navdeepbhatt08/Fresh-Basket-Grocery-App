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

module.exports = router;
