import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { fetchProduct } from '../api/productApi';
import useCartStore from '../store/cartStore';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchable = styled(TouchableOpacity);

const ProductDetailScreen = ({ route }: any) => {
  const { id } = route.params;
  const [product, setProduct] = useState<any>(null);
  const addToCart = useCartStore((s) => s.add);

  useEffect(() => {
    fetchProduct(id).then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return null;

  return (
    <ScrollView className="flex-1 bg-slate-950">
      {product.image && <StyledImage source={{ uri: product.image }} className="h-64" />}
      <StyledView className="p-4">
        <StyledText className="text-white text-2xl font-bold">{product.name}</StyledText>
        <StyledText className="text-cyan-400 text-xl mt-2">{product.price} USD</StyledText>
        <StyledText className="text-slate-400 mt-3">{product.description}</StyledText>
        <StyledText className="text-slate-300 mt-2">Hãng: {product.brand || 'N/A'}</StyledText>
        <StyledText className="text-slate-300">Công suất: {product.power || 'N/A'} kW</StyledText>
        <StyledTouchable className="bg-cyan-600 py-3 rounded-lg mt-4" onPress={() => addToCart(product.id, 1)}>
          <StyledText className="text-center text-white font-semibold">Thêm vào giỏ</StyledText>
        </StyledTouchable>
      </StyledView>
    </ScrollView>
  );
};

export default ProductDetailScreen;
