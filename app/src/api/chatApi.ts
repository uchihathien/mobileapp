import apiClient from './apiClient';

export const chatAI = (message: string) => apiClient.post('/chat/ai', { message });
export const fetchAdminConversations = () => apiClient.get('/chat/admin/conversations');
export const fetchAdminMessages = (conversationId: number) => apiClient.get(`/chat/admin/${conversationId}/messages`);
export const sendAdminMessage = (conversationId: number, content: string) =>
  apiClient.post(`/chat/admin/${conversationId}/message`, { content });
