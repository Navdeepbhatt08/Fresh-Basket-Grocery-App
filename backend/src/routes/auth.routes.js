
import express from "express"
import bcrypt from "bcrypt"

const router = express.Router()

router.post("/register", async (req, res) => {
  const { name, email, phone, address, password, role } = req.body

  //validation
  if (!name || !email || !phone || !address || !password || !role) {
    return res.status(400).json({ error: "All fields are required." })
  }

  const validRoles = ["buyer", "seller", "admin"]
  if (!validRoles.includes(role)) {
    return res.status(400).json({ error: "Invalid role." })
  }

  try {
    const pool = req.app.locals.pool

    // Check duplicate email
    const existing = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    )
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: "Email is already registered." })
    }


    const hashedPassword = await bcrypt.hash(password, 10)

    //Insert into PostgreSQL
    const result = await pool.query(
      `INSERT INTO users (name, email, phone, address, password, role)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, name, email, phone, address, role, created_at`,
      [name, email, phone, address, hashedPassword, role]
    )

    const user = result.rows[0]

    res.status(201).json({
      id:      user.id,
      name:    user.name,
      email:   user.email,
      phone:   user.phone,
      address: user.address,
      role:    user.role,
      token:   "demo-token"
    })

  } catch (err) {
    console.error("Register error:", err)
    res.status(500).json({ error: "Server error. Please try again." })
  }
})



export default router