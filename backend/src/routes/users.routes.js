import express from "express"
import pool from "../db/index.js"

const router = express.Router()

router.get("/users", async (req, res) => {
  try {
    const users = await pool.query("SELECT id, name, email, role FROM users")
    res.json(users.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
})

export default router