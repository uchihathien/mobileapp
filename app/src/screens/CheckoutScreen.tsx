import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import useCartStore from '../store/cartStore';
import useOrderStore from '../store/orderStore';
import { createPaymentApi } from '../api/paymentApi';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchable = styled(TouchableOpacity);

const CheckoutScreen = ({ navigation }: any) => {
  const { items, fetch } = useCartStore();
  const createOrder = useOrderStore((s) => s.createOrder);

  const total = items.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);

  const handleCheckout = async () => {
    const order = await createOrder({
      items: items.map((i) => ({ productId: i.productId, quantity: i.quantity, price: i.product?.price || 0 })),
      total
    });
    const payment = await createPaymentApi(order.id);
    fetch();
    navigation.navigate('Orders');
  };

  return (
    <StyledView className="flex-1 bg-slate-950 p-4">
      <StyledText className="text-white text-2xl font-bold mb-4">Xác nhận thanh toán</StyledText>
      <StyledText className="text-slate-300 mb-2">Tổng tiền: {total.toFixed(2)} USD</StyledText>
      <StyledTouchable className="bg-cyan-600 py-3 rounded-lg" onPress={handleCheckout}>
        <StyledText className="text-white text-center font-semibold">Tạo đơn hàng & Thanh toán</StyledText>
      </StyledTouchable>
    </StyledView>
  );
};

export default CheckoutScreen;
