const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    description: { type: String },
    image: { type: String, default: "https://via.placeholder.com/400x300?text=Shop" },
    etaMin: { type: Number, default: 20 },
    rating: { type: Number, default: 4.5 },
    tags: [{ type: String }],
    distanceKm: { type: Number, default: 1.5 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Shop", shopSchema);
