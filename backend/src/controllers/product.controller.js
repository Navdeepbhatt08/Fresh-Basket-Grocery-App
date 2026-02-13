import prisma from "../config/prisma.js"

export const getProducts = async (req, res) => {
  const products = await prisma.product.findMany()
  res.json(products)
}

export const addProduct = async (req, res) => {
  const { name, price, stock } = req.body

  const product = await prisma.product.create({
    data: {
      name,
      price: parseFloat(price),
      stock: parseInt(stock),
      ownerId: req.user.id
    }
  })

  res.json(product)
}
