import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import useAuthStore from '../store/authStore';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchable = styled(TouchableOpacity);

const ProfileScreen = () => {
  const { user, logout } = useAuthStore();

  return (
    <StyledView className="flex-1 bg-slate-950 p-4">
      <StyledText className="text-white text-2xl font-bold mb-2">Hồ sơ</StyledText>
      <StyledText className="text-slate-300 mb-1">Tên: {user?.name}</StyledText>
      <StyledText className="text-slate-300 mb-1">Email: {user?.email}</StyledText>
      <StyledText className="text-slate-300 mb-4">Quyền: {user?.role}</StyledText>
      <StyledTouchable className="bg-red-600 py-3 rounded-lg" onPress={logout}>
        <StyledText className="text-white text-center font-semibold">Đăng xuất</StyledText>
      </StyledTouchable>
    </StyledView>
  );
};

export default ProfileScreen;
