const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: { type: String },
        price: { type: Number },
        qty: { type: Number },
      },
    ],
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Preparing", "Out for delivery", "Delivered", "Cancelled"],
      default: "Preparing",
    },
    deliveryDetails: {
      name: { type: String },
      phone: { type: String },
      address: { type: String },
    },
    paymentMethod: { type: String, default: "cod" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
