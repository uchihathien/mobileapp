import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import useChatStore from '../store/chatStore';
import ChatBubble from '../components/ChatBubble';
import ChatInput from '../components/ChatInput';

const StyledView = styled(View);

const ChatAiScreen = () => {
  const { aiMessages, sendAI } = useChatStore();
  const [sending, setSending] = useState(false);

  const onSend = async (text: string) => {
    setSending(true);
    await sendAI(text);
    setSending(false);
  };

  return (
    <StyledView className="flex-1 bg-slate-950">
      <ScrollView className="flex-1 p-4">
        {aiMessages.map((m, idx) => (
          <ChatBubble key={idx} message={m.content} isUser={m.senderType === 'USER'} />
        ))}
      </ScrollView>
      <ChatInput onSend={onSend} />
    </StyledView>
  );
};

export default ChatAiScreen;
