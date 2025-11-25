import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchable = styled(TouchableOpacity);
const StyledImage = styled(Image);

interface Props {
  product: any;
  onPress?: () => void;
}

const ProductCard: React.FC<Props> = ({ product, onPress }) => (
  <StyledTouchable className="bg-slate-900 rounded-xl p-4 mb-3 border border-slate-800" onPress={onPress}>
    {product.image && <StyledImage source={{ uri: product.image }} className="h-40 rounded" />}
    <StyledText className="text-white text-lg font-semibold mt-2">{product.name}</StyledText>
    <StyledText className="text-slate-400 text-sm">{product.brand}</StyledText>
    <StyledText className="text-cyan-400 text-base mt-1">{product.price} USD</StyledText>
  </StyledTouchable>
);

export default ProductCard;
