import { prisma } from '../config/db.js';
import { askAI } from '../config/ai.js';

export const chatAI = async (req, res) => {
  const { message } = req.body;
  let conversation = await prisma.conversation.findFirst({ where: { userId: req.user.id, type: 'AI' } });
  if (!conversation) {
    conversation = await prisma.conversation.create({ data: { userId: req.user.id, type: 'AI' } });
  }
  const userMessage = await prisma.message.create({
    data: { conversationId: conversation.id, senderType: 'USER', type: 'HUMAN', content: message }
  });
  const aiReply = await askAI([{ role: 'user', content: message }]);
  const aiMessage = await prisma.message.create({
    data: { conversationId: conversation.id, senderType: 'AI', type: 'AI', content: aiReply }
  });
  const messages = await prisma.message.findMany({ where: { conversationId: conversation.id }, orderBy: { createdAt: 'asc' } });
  res.json({ reply: aiReply, conversationId: conversation.id, messages });
};

export const listAdminConversations = async (req, res) => {
  const conversations = await prisma.conversation.findMany({ where: { type: 'ADMIN' }, include: { user: true } });
  res.json(conversations);
};

export const getConversationMessages = async (req, res) => {
  const { conversationId } = req.params;
  const messages = await prisma.message.findMany({ where: { conversationId: Number(conversationId) }, orderBy: { createdAt: 'asc' } });
  res.json(messages);
};

export const postAdminMessage = async (req, res) => {
  const { conversationId } = req.params;
  const { content } = req.body;
  const message = await prisma.message.create({ data: { conversationId: Number(conversationId), senderType: 'ADMIN', type: 'ADMIN', content } });
  res.status(201).json(message);
};
