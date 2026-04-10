const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, phone, address, password, role } = req.body;

  if (!name || !email || !phone || !address || !password || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      phone,
      address,
      password: hashedPassword,
      role,
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "freshbasket-secret",
      { expiresIn: "7d" },
    );

    return res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to register user" });
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "freshbasket-secret",
      { expiresIn: "7d" },
    );

    return res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to login" });
  }
});
module.exports = router;
