const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, lowercase: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    house: { type: String, required: true },
    area: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    type: { type: String, default: "Home" }, 
    fullAddress: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);
