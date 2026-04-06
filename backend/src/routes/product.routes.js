import express from "express";
import { getProducts, addProduct } from "../controllers/product.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", authenticate, addProduct);

export default router;
