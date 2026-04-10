const express = require("express");

const router = express.Router();

const products = [
  {
    id: "1",
    name: "Fresh Tomatoes",
    category: "vegetables",
    price: 2.9,
    description: "Juicy local tomatoes, perfect for salads and cooking.",
    image: "https://via.placeholder.com/400x300?text=Tomatoes",
  },
  {
    id: "2",
    name: "Organic Apples",
    category: "fruits",
    price: 3.5,
    description: "Crisp organic apples picked fresh from the farm.",
    image: "https://via.placeholder.com/400x300?text=Apples",
  },
  {
    id: "3",
    name: "Fresh Milk",
    category: "dairy",
    price: 1.8,
    description: "Cold fresh milk delivered daily.",
    image: "https://via.placeholder.com/400x300?text=Milk",
  },
];

router.get("/", (req, res) => {
  res.json(products);
});

module.exports = router;
