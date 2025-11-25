import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { getCart, addToCart, updateCartItem, removeCartItem } from '../controllers/cart.controller.js';

const router = Router();
router.get('/', authenticate(), getCart);
router.post('/', authenticate(), addToCart);
router.put('/:productId', authenticate(), updateCartItem);
router.delete('/:productId', authenticate(), removeCartItem);

export default router;
