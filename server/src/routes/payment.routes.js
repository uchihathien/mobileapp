import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { createPayment, sepayCallback } from '../controllers/payment.controller.js';

const router = Router();
router.post('/create', authenticate(), createPayment);
router.post('/sepay/callback', sepayCallback);

export default router;
