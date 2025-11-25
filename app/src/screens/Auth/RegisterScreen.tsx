import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import useAuthStore from '../../store/authStore';

const StyledText = styled(Text);
const StyledInput = styled(TextInput);
const StyledTouchable = styled(TouchableOpacity);

const RegisterScreen = ({ navigation }: any) => {
  const register = useAuthStore((s) => s.register);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScrollView className="flex-1 bg-slate-950 p-6">
      <StyledText className="text-3xl text-white font-bold mb-6">Đăng ký</StyledText>
      <StyledInput
        className="bg-slate-800 text-white px-4 py-3 rounded-lg mb-3"
        placeholder="Họ tên"
        placeholderTextColor="#94a3b8"
        onChangeText={setName}
        value={name}
      />
      <StyledInput
        className="bg-slate-800 text-white px-4 py-3 rounded-lg mb-3"
        placeholder="Email"
        placeholderTextColor="#94a3b8"
        onChangeText={setEmail}
        value={email}
      />
      <StyledInput
        className="bg-slate-800 text-white px-4 py-3 rounded-lg mb-3"
        placeholder="Mật khẩu"
        placeholderTextColor="#94a3b8"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <StyledTouchable className="bg-cyan-600 py-3 rounded-lg" onPress={() => register(name, email, password)}>
        <StyledText className="text-white text-center font-semibold">Tạo tài khoản</StyledText>
      </StyledTouchable>
      <StyledTouchable className="mt-4" onPress={() => navigation.goBack()}>
        <StyledText className="text-cyan-400 text-center">Đã có tài khoản? Đăng nhập</StyledText>
      </StyledTouchable>
    </ScrollView>
  );
};

export default RegisterScreen;
