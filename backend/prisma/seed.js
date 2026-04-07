import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding FreshBasket database...");

  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@freshbasket.com" },
    update: {},
    create: {
      name: "FreshBasket Admin",
      email: "admin@freshbasket.com",
      password: hashedPassword,
      phone: "9999900000",
      role: Role.ADMIN,
      isVerified: true,
    },
  });

  console.log("Admin created:", admin.email);

  const categories = [
    { name: "Fruits & Vegetables", slug: "fruits-vegetables", sortOrder: 1 },
    { name: "Dairy & Eggs", slug: "dairy-eggs", sortOrder: 2 },
    { name: "Bakery & Bread", slug: "bakery-bread", sortOrder: 3 },
    { name: "Beverages", slug: "beverages", sortOrder: 4 },
    { name: "Snacks & Namkeen", slug: "snacks-namkeen", sortOrder: 5 },
    { name: "Staples & Grains", slug: "staples-grains", sortOrder: 6 },
    { name: "Personal Care", slug: "personal-care", sortOrder: 7 },
    { name: "Cleaning & Household", slug: "cleaning-household", sortOrder: 8 },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  console.log("Categories seeded:", categories.length);

  const fruitsCategory = await prisma.category.findUnique({
    where: { slug: "fruits-vegetables" },
  });

  const dairyCategory = await prisma.category.findUnique({
    where: { slug: "dairy-eggs" },
  });

  const products = [
    {
      categoryId: fruitsCategory.id,
      name: "Fresh Tomatoes",
      slug: "fresh-tomatoes",
      description: "Farm-fresh red tomatoes, perfect for daily cooking.",
      unit: "500g",
      price: 25,
      mrp: 30,
      stock: 100,
      isFeatured: true,
      tags: ["fresh", "vegetable", "daily"],
    },
    {
      categoryId: fruitsCategory.id,
      name: "Bananas",
      slug: "bananas",
      description: "Ripe Robusta bananas, naturally sweet.",
      unit: "6 pcs",
      price: 40,
      mrp: 50,
      stock: 80,
      isFeatured: true,
      tags: ["fresh", "fruit"],
    },
    {
      categoryId: dairyCategory.id,
      name: "Amul Full Cream Milk",
      slug: "amul-full-cream-milk",
      description: "Pasteurised & homogenised full cream milk.",
      unit: "1 Litre",
      price: 68,
      mrp: 72,
      stock: 200,
      isFeatured: false,
      tags: ["dairy", "milk", "amul"],
    },
    {
      categoryId: dairyCategory.id,
      name: "Free-Range Eggs",
      slug: "free-range-eggs",
      description: "Farm-fresh free-range eggs, protein-rich.",
      unit: "12 pcs",
      price: 90,
      mrp: 100,
      stock: 150,
      isFeatured: true,
      tags: ["eggs", "protein", "fresh"],
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
  }

  console.log("Products seeded:", products.length);

  await prisma.coupon.upsert({
    where: { code: "FRESH10" },
    update: {},
    create: {
      code: "FRESH10",
      type: "PERCENTAGE",
      value: 10,
      minOrderValue: 200,
      maxUses: 500,
      isActive: true,
    },
  });

  console.log("Coupon FRESH10 created");
  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
