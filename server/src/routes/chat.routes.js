import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { chatAI, listAdminConversations, getConversationMessages, postAdminMessage } from '../controllers/chat.controller.js';

const router = Router();
router.post('/ai', authenticate(), chatAI);
router.get('/admin/conversations', authenticate(['ADMIN']), listAdminConversations);
router.get('/admin/:conversationId/messages', authenticate(), getConversationMessages);
router.post('/admin/:conversationId/message', authenticate(['ADMIN']), postAdminMessage);

export default router;
