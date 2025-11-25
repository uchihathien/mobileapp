import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { listProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/products.controller.js';

const router = Router();
router.get('/', listProducts);
router.get('/:id', getProduct);
router.post('/', authenticate(['ADMIN']), createProduct);
router.put('/:id', authenticate(['ADMIN']), updateProduct);
router.delete('/:id', authenticate(['ADMIN']), deleteProduct);

export default router;
