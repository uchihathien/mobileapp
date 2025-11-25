import { prisma } from '../config/db.js';

export const getCart = async (req, res) => {
  const items = await prisma.cartItem.findMany({ where: { userId: req.user.id }, include: { product: true } });
  res.json(items);
};

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const item = await prisma.cartItem.upsert({
    where: { userId_productId: { userId: req.user.id, productId } },
    update: { quantity: { increment: quantity || 1 } },
    create: { userId: req.user.id, productId, quantity: quantity || 1 }
  });
  res.status(201).json(item);
};

export const updateCartItem = async (req, res) => {
  const { quantity } = req.body;
  const item = await prisma.cartItem.update({
    where: { userId_productId: { userId: req.user.id, productId: Number(req.params.productId) } },
    data: { quantity }
  });
  res.json(item);
};

export const removeCartItem = async (req, res) => {
  await prisma.cartItem.delete({ where: { userId_productId: { userId: req.user.id, productId: Number(req.params.productId) } } });
  res.json({ message: 'Removed' });
};
