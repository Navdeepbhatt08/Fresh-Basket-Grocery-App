const express = require("express");
const User = require("../models/User");
const Shop = require("../models/Shop");
const Order = require("../models/Order");
const Product = require("../models/Product");
const router = express.Router();

// Get overall admin statistics
router.get("/stats", async (req, res) => {
  try {
    const [userCount, sellerCount, shopCount, orderCount, productCount, orders] = await Promise.all([
      User.countDocuments({ role: "buyer" }),
      User.countDocuments({ role: "seller" }),
      Shop.countDocuments(),
      Order.countDocuments(),
      Product.countDocuments(),
      Order.find({ status: { $ne: "Cancelled" } }),
    ]);

    const totalGMV = orders.reduce((acc, curr) => acc + curr.total, 0);
    const recentOrders = await Order.find()
      .populate("buyer", "name")
      .populate("seller", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      kpis: [
        { label: "Active Buyers", value: userCount },
        { label: "Active Sellers", value: sellerCount },
        { label: "Total Shops", value: shopCount },
        { label: "Orders (All Time)", value: orderCount },
        { label: "GMV (All Time)", value: totalGMV },
        { label: "Live Products", value: productCount },
      ],
      recentOrders,
      alerts: [
        {
          id: "al_1",
          title: "Database Healthy",
          detail: `Monitoring ${productCount} products across ${shopCount} shops.`,
        },
        {
          id: "al_2",
          title: "Recent Growth",
          detail: `Total user base reached ${userCount + sellerCount} accounts.`,
        },
      ],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
