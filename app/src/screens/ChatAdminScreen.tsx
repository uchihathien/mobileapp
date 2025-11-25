import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import useChatStore from '../store/chatStore';
import ChatBubble from '../components/ChatBubble';
import ChatInput from '../components/ChatInput';
import useAuthStore from '../store/authStore';

const StyledView = styled(View);

const ChatAdminScreen = () => {
  const { user } = useAuthStore();
  const { adminMessages, connectAdmin, sendAdmin } = useChatStore();
  const [conversationId, setConversationId] = useState<number>(1);

  useEffect(() => {
    if (user) {
      const convId = user.id; // simple mapping
      setConversationId(convId);
      connectAdmin(convId);
    }
  }, [user]);

  return (
    <StyledView className="flex-1 bg-slate-950">
      <ScrollView className="flex-1 p-4">
        {adminMessages.map((m, idx) => (
          <ChatBubble key={idx} message={m.content} isUser={m.senderType === 'USER'} />
        ))}
      </ScrollView>
      <ChatInput onSend={(text) => sendAdmin(conversationId, text)} />
    </StyledView>
  );
};

export default ChatAdminScreen;
