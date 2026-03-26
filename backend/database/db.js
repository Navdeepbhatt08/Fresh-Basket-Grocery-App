
const prisma = require("../src/config/prisma");


async function connectDB() {
  try {
    await prisma.$connect();
    console.log("✅  PostgreSQL connected via Prisma");
  } catch (error) {
    console.error("  Database connection failed:", error.message);
    process.exit(1);
  }
}


async function disconnectDB() {
  await prisma.$disconnect();
  console.log("🔌  PostgreSQL disconnected");
}

module.exports = { connectDB, disconnectDB };