import { prisma } from '../config/db.js';
import { createPaymentRequest } from '../config/sepay.js';

export const createPayment = async (req, res) => {
  const { orderId } = req.body;
  const order = await prisma.order.findUnique({ where: { id: orderId }, include: { payment: true } });
  if (!order) return res.status(404).json({ message: 'Order not found' });
  const paymentRequest = await createPaymentRequest({ amount: order.total, orderCode: `ORD-${order.id}`, description: 'Order payment' });
  await prisma.payment.update({ where: { id: order.paymentId }, data: { externalId: paymentRequest.id, qrUrl: paymentRequest.qrUrl } });
  res.json(paymentRequest);
};

export const sepayCallback = async (req, res) => {
  const { orderCode, status } = req.body;
  const orderId = Number(orderCode?.replace('ORD-', ''));
  if (!orderId) return res.status(400).json({ message: 'Invalid order' });
  const paid = status === 'PAID';
  await prisma.payment.updateMany({ where: { orderId }, data: { status: paid ? 'PAID' : 'CANCELLED' } });
  await prisma.order.update({ where: { id: orderId }, data: { status: paid ? 'PAID' : 'CANCELLED' } });
  res.json({ message: 'OK' });
};
