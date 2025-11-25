import React from 'react';
import * as AuthSession from 'expo-auth-session';
import { TouchableOpacity, Text } from 'react-native';
import { styled } from 'nativewind';
import useAuthStore from '../../store/authStore';
import Constants from 'expo-constants';

const StyledTouchable = styled(TouchableOpacity);
const StyledText = styled(Text);

const discovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://www.googleapis.com/oauth2/v4/token'
};

const GoogleLoginButton = () => {
  const googleLogin = useAuthStore((s) => s.googleLogin);

  const handleLogin = async () => {
    const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
    const result = await AuthSession.startAsync({
      authUrl: `${discovery.authorizationEndpoint}?client_id=${Constants.expoConfig?.extra?.googleClientId}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&response_type=id_token&scope=openid%20email%20profile`
    });
    if (result.type === 'success' && result.params?.id_token) {
      await googleLogin(result.params.id_token);
    }
  };

  return (
    <StyledTouchable className="bg-red-500 py-3 rounded-lg" onPress={handleLogin}>
      <StyledText className="text-white text-center font-semibold">Đăng nhập Google</StyledText>
    </StyledTouchable>
  );
};

export default GoogleLoginButton;
