import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChatAiScreen from '../screens/ChatAiScreen';
import ChatAdminScreen from '../screens/ChatAdminScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const ShopStackNav = createNativeStackNavigator();

const ShopStack = () => (
  <ShopStackNav.Navigator screenOptions={{ headerShown: false }}>
    <ShopStackNav.Screen name="Home" component={HomeScreen} />
    <ShopStackNav.Screen name="Category" component={CategoryScreen} />
    <ShopStackNav.Screen name="ProductList" component={ProductListScreen} />
    <ShopStackNav.Screen name="ProductDetail" component={ProductDetailScreen} />
    <ShopStackNav.Screen name="Checkout" component={CheckoutScreen} />
  </ShopStackNav.Navigator>
);

const SupportStackNav = createNativeStackNavigator();
const SupportStack = () => (
  <SupportStackNav.Navigator screenOptions={{ headerShown: false }}>
    <SupportStackNav.Screen name="ChatAI" component={ChatAiScreen} />
    <SupportStackNav.Screen name="ChatAdmin" component={ChatAdminScreen} />
  </SupportStackNav.Navigator>
);

const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: { backgroundColor: '#0b1118', borderTopColor: '#1f2937' },
      tabBarActiveTintColor: '#22d3ee',
      tabBarIcon: ({ color, size }) => {
        const icons = { Shop: 'home', Cart: 'cart', Orders: 'list', Profile: 'person', Support: 'chatbubble' } as const;
        return <Ionicons name={icons[route.name as keyof typeof icons]} size={size} color={color} />;
      }
    })}
  >
    <Tab.Screen name="Shop" component={ShopStack} />
    <Tab.Screen name="Cart" component={CartScreen} />
    <Tab.Screen name="Orders" component={OrdersScreen} />
    <Tab.Screen name="Support" component={SupportStack} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

export default MainTabNavigator;
