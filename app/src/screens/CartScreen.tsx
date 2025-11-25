import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import useCartStore from '../store/cartStore';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchable = styled(TouchableOpacity);

const CartScreen = ({ navigation }: any) => {
  const { items, fetch, update, remove } = useCartStore();

  useEffect(() => {
    fetch();
  }, []);

  const total = items.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);

  return (
    <StyledView className="flex-1 bg-slate-950 p-4">
      <StyledText className="text-white text-2xl font-bold mb-3">Giỏ hàng</StyledText>
      <ScrollView>
        {items.map((item) => (
          <StyledView key={item.productId} className="bg-slate-900 p-3 rounded-lg mb-3">
            <StyledText className="text-white text-lg">{item.product?.name}</StyledText>
            <StyledText className="text-slate-400">Số lượng: {item.quantity}</StyledText>
            <StyledView className="flex-row mt-2">
              <StyledTouchable className="bg-slate-800 px-3 py-1 rounded mr-2" onPress={() => update(item.productId, item.quantity + 1)}>
                <StyledText className="text-white">+</StyledText>
              </StyledTouchable>
              <StyledTouchable
                className="bg-slate-800 px-3 py-1 rounded mr-2"
                onPress={() => update(item.productId, Math.max(1, item.quantity - 1))}
              >
                <StyledText className="text-white">-</StyledText>
              </StyledTouchable>
              <StyledTouchable className="bg-red-600 px-3 py-1 rounded" onPress={() => remove(item.productId)}>
                <StyledText className="text-white">Xóa</StyledText>
              </StyledTouchable>
            </StyledView>
          </StyledView>
        ))}
      </ScrollView>
      <StyledView className="mt-auto">
        <StyledText className="text-white text-xl">Tổng: {total.toFixed(2)} USD</StyledText>
        <StyledTouchable className="bg-cyan-600 py-3 rounded-lg mt-3" onPress={() => navigation.navigate('Checkout')}> 
          <StyledText className="text-center text-white font-semibold">Thanh toán</StyledText>
        </StyledTouchable>
      </StyledView>
    </StyledView>
  );
};

export default CartScreen;
