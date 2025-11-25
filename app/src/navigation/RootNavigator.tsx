import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';
import useAuthStore from '../store/authStore';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const token = useAuthStore((s) => s.token);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!token ? <Stack.Screen name="Auth" component={AuthNavigator} /> : <Stack.Screen name="Main" component={MainTabNavigator} />}
    </Stack.Navigator>
  );
};

export default RootNavigator;
