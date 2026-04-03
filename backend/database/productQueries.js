const pool = require("./db");

const getAllProducts = async ({ limit = 20, offset = 0, category }) => {
  let query = `SELECT p.*, c.name AS category_name
 FROM products p
 JOIN categories c ON p.category_id = c.id
 WHERE p.is_active = TRUE`;
  const params = [];
  if (category) {
    params.push(category);
    query += ` AND c.slug = $${params.length}`;
  }
  params.push(limit, offset);
  query += ` ORDER BY p.created_at DESC
 LIMIT $${params.length - 1} OFFSET $${params.length}`;
  const { rows } = await pool.query(query, params);
  return rows;
};

const getProductBySlug = async (slug) => {
  const { rows } = await pool.query(
    `SELECT p.*, c.name AS category_name,
 COALESCE(AVG(r.rating),0) AS avg_rating,
 COUNT(r.id) AS review_count
 FROM products p
 JOIN categories c ON p.category_id = c.id
 LEFT JOIN reviews r ON r.product_id = p.id
 WHERE p.slug = $1 AND p.is_active = TRUE
 GROUP BY p.id, c.name`,
    [slug],
  );
  return rows[0];
};

const searchProducts = async (keyword) => {
  const { rows } = await pool.query(
    `SELECT * FROM products
 WHERE is_active = TRUE
 AND (name ILIKE $1 OR description ILIKE $1)
 ORDER BY name LIMIT 30`,
    [`%${keyword}%`],
  );
  return rows;
};
module.exports = { getAllProducts, getProductBySlug, searchProducts };
