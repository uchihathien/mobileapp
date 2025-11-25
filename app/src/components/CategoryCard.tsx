import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledTouchable = styled(TouchableOpacity);
const StyledText = styled(Text);

const CategoryCard = ({ name, onPress }: { name: string; onPress?: () => void }) => (
  <StyledTouchable className="bg-slate-800 px-4 py-3 rounded-lg mr-3" onPress={onPress}>
    <StyledText className="text-white font-semibold">{name}</StyledText>
  </StyledTouchable>
);

export default CategoryCard;
