import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import useAuthStore from '../../store/authStore';
import GoogleLoginButton from './GoogleLoginButton';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledInput = styled(TextInput);
const StyledTouchable = styled(TouchableOpacity);

const LoginScreen = ({ navigation }: any) => {
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScrollView className="flex-1 bg-slate-950 p-6">
      <StyledText className="text-3xl text-white font-bold mb-6">Đăng nhập</StyledText>
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
      <StyledTouchable className="bg-cyan-600 py-3 rounded-lg mb-3" onPress={() => login(email, password)}>
        <StyledText className="text-white text-center font-semibold">Đăng nhập</StyledText>
      </StyledTouchable>
      <GoogleLoginButton />
      <StyledTouchable className="mt-4" onPress={() => navigation.navigate('Register')}>
        <StyledText className="text-cyan-400 text-center">Chưa có tài khoản? Đăng ký</StyledText>
      </StyledTouchable>
    </ScrollView>
  );
};

export default LoginScreen;
