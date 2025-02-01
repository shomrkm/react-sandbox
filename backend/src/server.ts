import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors';

const app = express()
const prisma = new PrismaClient()

app.use(express.json());

app.use(cors());

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

app.patch('/products/:id/add-to-cart', async (req, res) => {
  try {
    const { id } = req.params;

    const existingProduct = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!existingProduct) {
      return res.status(404).json({ ok: false, error: 'Product not found' });
    }

    const updatedCart = existingProduct.cart + 1;

    if(existingProduct.stocks < updatedCart){
      return res.status(400).json({ ok: false, error: 'Stocks are not enough' });
    }

    await prisma.product.update({
      where: { id: Number(id) },
      data: { cart: updatedCart },
    });

    return res.json({ ok: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, error: 'An error occurred while adding the product to the cart' });
  }
})

app.patch('/products/:id/stock', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body)
    const { stocks } = req.body;

    const existingProduct = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!existingProduct) {
      return res.status(404).json({ ok: false, error: 'Product not found' });
    }

    await prisma.product.update({
      where: { id: Number(id) },
      data: { stocks },
    });

    return res.json({ ok: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, error: 'An error occurred while updating the stocks' });
  }
})

app.patch('/products/:id/clear-cart', async (req, res) => {
  try {
    const { id } = req.params;

    const existingProduct = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!existingProduct) {
      return res.status(404).json({ ok: false, error: 'Product not found' });
    }

    await prisma.product.update({
      where: { id: Number(id) },
      data: { cart: 0 },
    });

    return res.json({ ok: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, error: 'An error occurred while updating the stocks' });
  }
})



const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})
