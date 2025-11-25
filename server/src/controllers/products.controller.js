import { prisma } from '../config/db.js';

export const listProducts = async (req, res) => {
  const { categoryId, search, brand, powerMin, powerMax } = req.query;
  const products = await prisma.product.findMany({
    where: {
      categoryId: categoryId ? Number(categoryId) : undefined,
      brand: brand || undefined,
      power: {
        gte: powerMin ? Number(powerMin) : undefined,
        lte: powerMax ? Number(powerMax) : undefined
      },
      OR: search
        ? [
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } }
          ]
        : undefined
    },
    include: { category: true }
  });
  res.json(products);
};

export const getProduct = async (req, res) => {
  const product = await prisma.product.findUnique({ where: { id: Number(req.params.id) }, include: { category: true } });
  if (!product) return res.status(404).json({ message: 'Not found' });
  res.json(product);
};

export const createProduct = async (req, res) => {
  const data = req.body;
  const product = await prisma.product.create({ data });
  res.status(201).json(product);
};

export const updateProduct = async (req, res) => {
  const product = await prisma.product.update({ where: { id: Number(req.params.id) }, data: req.body });
  res.json(product);
};

export const deleteProduct = async (req, res) => {
  await prisma.product.delete({ where: { id: Number(req.params.id) } });
  res.json({ message: 'Deleted' });
};
