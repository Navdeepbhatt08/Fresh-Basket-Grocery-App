const pool = require("../src/server.js").pool;

const createOrder = async (userId, addressId, cartItems, couponId) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const subtotal = cartItems.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0,
    );
    const total = subtotal;
    const {
      rows: [order],
    } = await client.query(
      `INSERT INTO orders (user_id, address_id, coupon_id, subtotal, total)
 VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [userId, addressId, couponId || null, subtotal, total],
    );
    for (const item of cartItems) {
      await client.query(
        `INSERT INTO order_items
 (order_id, product_id, quantity, unit_price)
 VALUES ($1, $2, $3, $4)`,
        [order.id, item.product_id, item.quantity, item.price],
      );
      await client.query(
        `UPDATE products SET stock = stock - $1 WHERE id = $2`,
        [item.quantity, item.product_id],
      );
    }

    await client.query(`DELETE FROM cart WHERE user_id = $1`, [userId]);
    await client.query("COMMIT");
    return order;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};
const getUserOrders = async (userId) => {
  const { rows } = await pool.query(
    `SELECT o.*,
 json_agg(json_build_object(
 'product', p.name,
 'qty', oi.quantity,
 'price', oi.unit_price
 )) AS items
 FROM orders o
 JOIN order_items oi ON oi.order_id = o.id
 JOIN products p ON p.id = oi.product_id
 WHERE o.user_id = $1
 GROUP BY o.id
 ORDER BY o.created_at DESC`,
    [userId],
  );
  return rows;
};
module.exports = { createOrder, getUserOrders };
