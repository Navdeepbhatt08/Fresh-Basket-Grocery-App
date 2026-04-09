import express from "express";
import { Pool } from "pg";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "grocery2",
  user: "postgres",
  password: "root",
});

app.locals.pool = pool;

async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id          SERIAL PRIMARY KEY,
      name        VARCHAR(100)  NOT NULL,
      email       VARCHAR(150)  NOT NULL UNIQUE,
      phone       VARCHAR(20),
      address     TEXT,
      password    TEXT          NOT NULL,
      role        VARCHAR(20)   NOT NULL DEFAULT 'buyer'
      CHECK (role IN ('buyer', 'seller', 'admin')),
      created_at  TIMESTAMPTZ   DEFAULT NOW()
    );
  `);
}

app.use("/api", authRoutes);

const PORT = 5000;
initDB()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running at http://localhost:${PORT}`),
    );
  })
  .catch((err) => {
    console.error("DB init failed:", err);
    process.exit(1);
  });
