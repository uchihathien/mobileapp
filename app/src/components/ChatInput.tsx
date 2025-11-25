import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledInput = styled(TextInput);
const StyledTouchable = styled(TouchableOpacity);
const StyledText = styled(Text);

const ChatInput = ({ onSend }: { onSend: (text: string) => void }) => {
  const [text, setText] = useState('');
  return (
    <StyledView className="flex-row items-center p-3 border-t border-slate-800 bg-slate-900">
      <StyledInput
        className="flex-1 bg-slate-800 text-white px-3 py-2 rounded-lg"
        placeholder="Nhập tin nhắn"
        placeholderTextColor="#94a3b8"
        value={text}
        onChangeText={setText}
      />
      <StyledTouchable
        className="ml-2 px-4 py-2 bg-cyan-600 rounded-lg"
        onPress={() => {
          if (text.trim().length) {
            onSend(text.trim());
            setText('');
          }
        }}
      >
        <StyledText className="text-white font-semibold">Gửi</StyledText>
      </StyledTouchable>
    </StyledView>
  );
};

export default ChatInput;
