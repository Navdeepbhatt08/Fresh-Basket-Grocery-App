const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const productsRoutes = require("./routes/products");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "FreshBasket backend running" });
});


app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/Users", usersRoutes);
app.use("/api/products", productsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
