import React from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

const ChatBubble = ({ message, isUser }: { message: string; isUser: boolean }) => (
  <StyledView className={`max-w-[80%] my-2 px-4 py-3 rounded-2xl ${isUser ? 'bg-cyan-600 self-end' : 'bg-slate-800 self-start'}`}>
    <StyledText className="text-white">{message}</StyledText>
  </StyledView>
);

export default ChatBubble;
