import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors';

const app = express()
const prisma = new PrismaClient()

app.use(cors());
app.use(express.json());

app.use(express.json());

app.get('/products', async (_, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
})

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  })
  res.json(product);
})

app.patch('/products/:id/cart', async (req, res) => {
  const { id } = req.params;
  const { cart } = req.body;

  const existingProduct = await prisma.product.findUnique({
    where: { id: Number(id) },
  });

  if (!existingProduct) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const updatedCart = existingProduct.cart + cart;

  const product = await prisma.product.update({
    where: { id: Number(id) },
    data: { cart: updatedCart },
  });

  return res.json(product);
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})
