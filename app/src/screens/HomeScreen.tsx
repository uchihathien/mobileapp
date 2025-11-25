import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { fetchCategories, fetchProducts } from '../api/productApi';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchable = styled(TouchableOpacity);

const HomeScreen = ({ navigation }: any) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [featured, setFeatured] = useState<any[]>([]);

  useEffect(() => {
    fetchCategories().then((res) => setCategories(res.data));
    fetchProducts({ take: 5 }).then((res) => setFeatured(res.data));
  }, []);

  return (
    <ScrollView className="flex-1 bg-slate-950">
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1503387826192-04a41cad9638?auto=format&fit=crop&w=1000&q=80' }}
        className="h-48 justify-end p-6"
      >
        <StyledText className="text-white text-2xl font-bold">Thiết bị cơ khí chuyên nghiệp</StyledText>
        <StyledText className="text-slate-200">Ưu đãi dành cho thợ và doanh nghiệp</StyledText>
      </ImageBackground>

      <StyledView className="p-4">
        <StyledText className="text-white text-xl font-semibold mb-2">Danh mục</StyledText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
          {categories.map((c) => (
            <CategoryCard key={c.id} name={c.name} onPress={() => navigation.navigate('Category', { category: c })} />
          ))}
        </ScrollView>

        <StyledView className="flex-row justify-between items-center mb-2">
          <StyledText className="text-white text-xl font-semibold">Sản phẩm nổi bật</StyledText>
          <StyledTouchable onPress={() => navigation.navigate('ProductList')}>
            <StyledText className="text-cyan-400">Xem tất cả</StyledText>
          </StyledTouchable>
        </StyledView>
        {featured.map((p) => (
          <ProductCard key={p.id} product={p} onPress={() => navigation.navigate('ProductDetail', { id: p.id })} />
        ))}
      </StyledView>
    </ScrollView>
  );
};

export default HomeScreen;
