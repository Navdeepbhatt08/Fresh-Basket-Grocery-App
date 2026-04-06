import prisma from "../config/prisma.js";

const createSlug = (value) =>
  value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");

export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { name, price, stock, description, categoryId } = req.body;
    if (!name || !price || !stock) {
      return res
        .status(400)
        .json({ message: "Name, price, and stock are required" });
    }

    let slug = createSlug(name);
    const existingProduct = await prisma.product.findUnique({
      where: { slug },
    });
    if (existingProduct) {
      slug = `${slug}-${Date.now().toString().slice(-5)}`;
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description: description || "",
        price: parseFloat(price),
        stock: parseInt(stock, 10),
        categoryId: categoryId || undefined,
        sellerId: req.user.id,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Add product error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
