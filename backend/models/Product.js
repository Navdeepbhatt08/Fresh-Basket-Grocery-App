const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    store: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    unit: { type: String, default: "kg" },
    description: { type: String },
    image: { type: String, default: "https://via.placeholder.com/400x300?text=Product" },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
