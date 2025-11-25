import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import { fetchProducts } from '../api/productApi';
import ProductCard from '../components/ProductCard';

const StyledView = styled(View);
const StyledText = styled(Text);

const ProductListScreen = ({ navigation, route }: any) => {
  const [products, setProducts] = useState<any[]>([]);
  const categoryId = route.params?.categoryId;

  useEffect(() => {
    fetchProducts({ categoryId }).then((res) => setProducts(res.data));
  }, [categoryId]);

  return (
    <ScrollView className="flex-1 bg-slate-950 p-4">
      <StyledText className="text-white text-2xl font-bold mb-3">Danh sách sản phẩm</StyledText>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onPress={() => navigation.navigate('ProductDetail', { id: p.id })} />
      ))}
    </ScrollView>
  );
};

export default ProductListScreen;
