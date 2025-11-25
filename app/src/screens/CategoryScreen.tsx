import React from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

const CategoryScreen = ({ route }: any) => {
  const { category } = route.params;
  return (
    <StyledView className="flex-1 bg-slate-950 p-4">
      <StyledText className="text-white text-2xl font-bold">{category.name}</StyledText>
      <StyledText className="text-slate-400 mt-2">Duyệt sản phẩm thuộc danh mục này.</StyledText>
    </StyledView>
  );
};

export default CategoryScreen;
