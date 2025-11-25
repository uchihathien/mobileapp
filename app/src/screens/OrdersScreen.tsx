import React, { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import useOrderStore from '../store/orderStore';

const StyledView = styled(View);
const StyledText = styled(Text);

const OrdersScreen = () => {
  const { orders, fetch } = useOrderStore();

  useEffect(() => {
    fetch();
  }, []);

  return (
    <ScrollView className="flex-1 bg-slate-950 p-4">
      <StyledText className="text-white text-2xl font-bold mb-3">Đơn hàng</StyledText>
      {orders.map((order) => (
        <StyledView key={order.id} className="bg-slate-900 p-3 rounded-lg mb-3">
          <StyledText className="text-white">Mã: #{order.id}</StyledText>
          <StyledText className="text-slate-400">Trạng thái: {order.status}</StyledText>
          <StyledText className="text-slate-300">Tổng: {order.total} USD</StyledText>
        </StyledView>
      ))}
    </ScrollView>
  );
};

export default OrdersScreen;
