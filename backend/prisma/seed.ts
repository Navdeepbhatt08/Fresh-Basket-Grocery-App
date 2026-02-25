
import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log("🌱 Seeding started...");

 
  const admin = await prisma.user.create({
    data: {
      name: "Admin User", 
      email: "admin@example.com",
      password: "admin123",
      role: Role.ADMIN,   
    },
  });


  const store = await prisma.user.create({
    data: {
      name: "Store Owner",
      email: "store@example.com",
      password: "store123",
      role: Role.STORE,   
    },
  });

  await prisma.product.createMany({
    data: [
      {
        name: "Laptop",
        price: 55000,
        stock: 10,
        ownerId: store.id,
      },
      {
        name: "Headphones",
        price: 2500,
        stock: 25,
        ownerId: store.id,
      },
      {
        name: "Smartphone",
        price: 20000,
        stock: 15,
        ownerId: store.id,
      },
    ],
  });

  console.log("✅ Seeding completed successfully!");
}

main()
    .catch((error: unknown) => {
      console.error(" Error while seeding:", error);
      process.exit(1);
    })
    .finally(async (): Promise<void> => {
      await prisma.$disconnect();
    });