import { Server } from 'socket.io';
import { prisma } from '../config/db.js';

export const initChatSocket = (server) => {
  const io = new Server(server, { cors: { origin: '*' } });
  io.on('connection', (socket) => {
    socket.on('join_conversation', (conversationId) => {
      socket.join(`c-${conversationId}`);
    });

    socket.on('user_message', async ({ conversationId, content, userId }) => {
      const msg = await prisma.message.create({
        data: { conversationId, content, senderType: 'USER', type: 'HUMAN', userId }
      });
      io.to(`c-${conversationId}`).emit('new_message', msg);
    });

    socket.on('admin_message', async ({ conversationId, content, adminId }) => {
      const msg = await prisma.message.create({
        data: { conversationId, content, senderType: 'ADMIN', type: 'ADMIN', adminId }
      });
      io.to(`c-${conversationId}`).emit('new_message', msg);
    });
  });
  return io;
};
