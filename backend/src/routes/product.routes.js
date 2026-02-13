import express from "express"
import { getProducts, addProduct } from "../controllers/product.controller.js"
import { verifyToken } from "../middleware/auth.middleware.js"

const router = express.Router()

router.get("/", getProducts)
router.post("/", verifyToken, addProduct)

export default router
