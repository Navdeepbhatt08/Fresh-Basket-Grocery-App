const pool = require("./db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerUser = async (name, email, password, phone) => {
  const hash = await bcrypt.hash(password, 10);
  const { rows } = await pool.query(
    `INSERT INTO users (name, email, password, phone)
 VALUES ($1, $2, $3, $4) RETURNING id, name, email, role`,
    [name, email, hash, phone],
  );
  return rows[0];
};
const loginUser = async (email, password) => {
  const { rows } = await pool.query(
    `SELECT * FROM users WHERE email = $1 AND is_active = TRUE`,
    [email],
  );
  if (!rows[0]) throw new Error("User not found");
  const match = await bcrypt.compare(password, rows[0].password);
  if (!match) throw new Error("Invalid credentials");
  const token = jwt.sign(
    { id: rows[0].id, role: rows[0].role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
  return {
    token,
    user: { id: rows[0].id, name: rows[0].name, role: rows[0].role },
  };
};
module.exports = { registerUser, loginUser };
