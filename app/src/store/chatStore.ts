import { create } from 'zustand';
import { chatAI, fetchAdminMessages, sendAdminMessage } from '../api/chatApi';
import { io, Socket } from 'socket.io-client';
import { BASE_URL } from '../config/env';

interface ChatMessage {
  id?: number;
  content: string;
  senderType: 'USER' | 'AI' | 'ADMIN';
}

interface ChatState {
  aiMessages: ChatMessage[];
  adminMessages: ChatMessage[];
  conversationId?: number;
  socket?: Socket;
  sendAI: (message: string) => Promise<void>;
  connectAdmin: (conversationId: number) => Promise<void>;
  sendAdmin: (conversationId: number, content: string) => Promise<void>;
}

const useChatStore = create<ChatState>((set, get) => ({
  aiMessages: [],
  adminMessages: [],
  conversationId: undefined,
  socket: undefined,
  sendAI: async (message: string) => {
    set((state) => ({ aiMessages: [...state.aiMessages, { content: message, senderType: 'USER' }] }));
    const { data } = await chatAI(message);
    set({ conversationId: data.conversationId, aiMessages: data.messages });
  },
  connectAdmin: async (conversationId: number) => {
    const { data } = await fetchAdminMessages(conversationId);
    let socket = get().socket;
    if (!socket) {
      socket = io(BASE_URL);
      set({ socket });
    }
    socket?.emit('join_conversation', conversationId);
    socket?.on('new_message', (msg) => {
      set((state) => ({ adminMessages: [...state.adminMessages, msg] }));
    });
    set({ adminMessages: data });
  },
  sendAdmin: async (conversationId, content) => {
    const socket = get().socket;
    socket?.emit('user_message', { conversationId, content });
    set((state) => ({ adminMessages: [...state.adminMessages, { content, senderType: 'USER' }] }));
    await sendAdminMessage(conversationId, content);
  }
}));

export default useChatStore;
