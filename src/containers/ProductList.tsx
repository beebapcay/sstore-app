import React from 'react';
import { FlatList, Box, Heading } from 'native-base';
import { Product } from '../models';
import { ProductCard } from '../components';
import { StyleProp, ViewStyle } from 'react-native';

interface Props {
  itemList: Product[];
  onTouchItem: Function;
  header?: JSX.Element;
  footer?: JSX.Element;
  style?: StyleProp<ViewStyle>;
}

const ProductList: React.FC<Props> = ({ itemList, onTouchItem, header, footer, style }) => {
  return (
    <FlatList
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
      data={itemList}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      renderItem={({ item }: { item: Product }) => (
        <ProductCard item={item} onTouch={onTouchItem} style={{ width: '50%', padding: 5, marginBottom: 20 }} />
      )}
      keyExtractor={(item: Product, index) => `${item.id} ${index}`}
      ListEmptyComponent={
        <Heading fontSize={18} color="gray.500" textAlign="center" bold marginTop="50%">
          No Products Found
        </Heading>
      }
      ListHeaderComponent={header}
      ListFooterComponent={footer}
      style={style}
    />
  );
};

export default ProductList;
