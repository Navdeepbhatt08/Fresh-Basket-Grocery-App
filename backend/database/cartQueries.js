import { pool } from "../src/server.js";

const addToCart = async (userId, productId, quantity) => {
 const { rows } = await pool.query(
 `INSERT INTO cart (user_id, product_id, quantity)
 VALUES ($1, $2, $3)
 ON CONFLICT (user_id, product_id)
 DO UPDATE SET quantity = cart.quantity + EXCLUDED.quantity
 RETURNING *`,
 [userId, productId, quantity]
 );
 return rows[0];
};

const getCart = async (userId) => {
 const { rows } = await pool.query(
 `SELECT c.id, c.quantity, p.name, p.price, p.unit,
 (c.quantity * p.price) AS line_total
 FROM cart c
 JOIN products p ON p.id = c.product_id
 WHERE c.user_id = $1`,
 [userId]
 );
 return rows;
};


const removeFromCart = async (userId, productId) => {
 await pool.query(
 `DELETE FROM cart WHERE user_id = $1 AND product_id = $2`,
 [userId, productId]
 );
}

module.exports = { addToCart, getCart, removeFromCart };