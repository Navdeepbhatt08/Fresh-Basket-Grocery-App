import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create Store Owner
  const owner = await prisma.user.create({
    data: {
      name: "Store Owner",
      email: "store@test.com",
      password: "123456",
      role: "STORE",
    },
  });

  // Add Products
  await prisma.product.createMany({
    data: [
      { name: "Rice 5kg", price: 350, stock: 20, ownerId: owner.id },
      { name: "Wheat Flour 10kg", price: 500, stock: 15, ownerId: owner.id },
      { name: "Milk 1L", price: 60, stock: 50, ownerId: owner.id },
      { name: "Eggs (12)", price: 90, stock: 40, ownerId: owner.id },
      { name: "Banana (6)", price: 40, stock: 60, ownerId: owner.id },
      { name: "Apple 1kg", price: 120, stock: 35, ownerId: owner.id },
      { name: "White Rice 10kg", price: 700, stock: 18, ownerId: owner.id },
      { name: "Cooking Oil 1L", price: 150, stock: 30, ownerId: owner.id },
      { name: "Sugar 1kg", price: 45, stock: 55, ownerId: owner.id },
      { name: "Salt 1kg", price: 20, stock: 70, ownerId: owner.id },
      { name: "Turmeric Powder 200g", price: 35, stock: 40, ownerId: owner.id },
      {
        name: "Red Chili Powder 200g",
        price: 60,
        stock: 38,
        ownerId: owner.id,
      },
      { name: "Cumin Seeds 100g", price: 55, stock: 25, ownerId: owner.id },
      { name: "Tea 500g", price: 220, stock: 22, ownerId: owner.id },
      { name: "Coffee 200g", price: 180, stock: 20, ownerId: owner.id },
      { name: "Bread Loaf", price: 30, stock: 45, ownerId: owner.id },
      { name: "Butter 500g", price: 250, stock: 18, ownerId: owner.id },
      { name: "Paneer 200g", price: 90, stock: 28, ownerId: owner.id },
      { name: "Potato 1kg", price: 30, stock: 80, ownerId: owner.id },
      { name: "Onion 1kg", price: 35, stock: 75, ownerId: owner.id },
      { name: "Tomato 1kg", price: 40, stock: 65, ownerId: owner.id },
      { name: "Green Peas 500g", price: 60, stock: 30, ownerId: owner.id },
      { name: "Toor Dal 1kg", price: 140, stock: 26, ownerId: owner.id },
      { name: "Moong Dal 1kg", price: 130, stock: 24, ownerId: owner.id },
      { name: "Chana Dal 1kg", price: 110, stock: 32, ownerId: owner.id },
      { name: "Basmati Rice 5kg", price: 600, stock: 14, ownerId: owner.id },
      {
        name: "Detergent Powder 1kg",
        price: 120,
        stock: 30,
        ownerId: owner.id,
      },
      { name: "Shampoo 200ml", price: 95, stock: 27, ownerId: owner.id },
      { name: "Toothpaste 150g", price: 85, stock: 33, ownerId: owner.id },
      {
        name: "Dishwash Liquid 500ml",
        price: 110,
        stock: 29,
        ownerId: owner.id,
      },
    ],
  });

  console.log("Seeded Successfully 🚀");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());