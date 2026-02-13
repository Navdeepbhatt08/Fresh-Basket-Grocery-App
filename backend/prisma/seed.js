import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Create Store Owner
  const owner = await prisma.user.create({
    data: {
      name: "Store Owner",
      email: "store@test.com",
      password: "123456",
      role: "STORE"
    }
  })

  // Add Products
  await prisma.product.createMany({
    data: [
      { name: "Rice 5kg", price: 350, stock: 20, ownerId: owner.id },
      { name: "Wheat Flour 10kg", price: 500, stock: 15, ownerId: owner.id },
      { name: "Milk 1L", price: 60, stock: 50, ownerId: owner.id },
      { name: "Eggs (12)", price: 90, stock: 40, ownerId: owner.id },
      { name: "Cooking Oil 1L", price: 150, stock: 30, ownerId: owner.id }
    ]
  })

  console.log("Seeded Successfully 🚀")
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect())
