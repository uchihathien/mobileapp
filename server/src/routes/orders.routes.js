import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { listOrders, createOrder, updateOrderStatus, adminListOrders } from '../controllers/orders.controller.js';

const router = Router();
router.get('/', authenticate(), listOrders);
router.post('/', authenticate(), createOrder);
router.put('/:id/status', authenticate(['ADMIN']), updateOrderStatus);
router.get('/admin/all', authenticate(['ADMIN']), adminListOrders);

export default router;
