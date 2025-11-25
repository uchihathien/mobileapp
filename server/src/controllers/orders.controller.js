import { prisma } from '../config/db.js';

export const listOrders = async (req, res) => {
  const orders = await prisma.order.findMany({ where: { userId: req.user.id }, include: { items: { include: { product: true } }, payment: true } });
  res.json(orders);
};

export const createOrder = async (req, res) => {
  const { items, total } = req.body;
  const order = await prisma.order.create({
    data: {
      userId: req.user.id,
      total,
      status: 'PENDING',
      items: {
        create: items.map((item) => ({ productId: item.productId, quantity: item.quantity, price: item.price }))
      },
      payment: { create: { status: 'PENDING', provider: 'SEPAY' } }
    },
    include: { items: true, payment: true }
  });
  res.status(201).json(order);
};

export const updateOrderStatus = async (req, res) => {
  const order = await prisma.order.update({ where: { id: Number(req.params.id) }, data: { status: req.body.status } });
  res.json(order);
};

export const adminListOrders = async (req, res) => {
  const orders = await prisma.order.findMany({ include: { user: true, items: { include: { product: true } }, payment: true } });
  res.json(orders);
};
