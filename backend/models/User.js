const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    bio: { type: String, default: "" },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["buyer", "seller", "admin"],
      default: "buyer",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
