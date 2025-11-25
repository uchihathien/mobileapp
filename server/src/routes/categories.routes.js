import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { listCategories, createCategory, updateCategory, deleteCategory } from '../controllers/categories.controller.js';

const router = Router();
router.get('/', listCategories);
router.post('/', authenticate(['ADMIN']), createCategory);
router.put('/:id', authenticate(['ADMIN']), updateCategory);
router.delete('/:id', authenticate(['ADMIN']), deleteCategory);

export default router;
