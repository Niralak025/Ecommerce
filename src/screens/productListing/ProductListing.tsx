import React, { useEffect } from 'react';
import { FlatList, Image, Pressable, StyleSheet, View } from 'react-native';
import AppText from '../../components/common/appText/AppText';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useProductListing } from './ProductListingViewModel';
import { Product } from '../../type/ProductTypes';
import { HomeNavigatorStackParamList } from '../../navigators/HomeNavigator';
type ProductListingNavigationProp = {
  navigation: NativeStackNavigationProp<
    HomeNavigatorStackParamList,
    'productListing'
  >;
};

const ProductListing: React.FC<ProductListingNavigationProp> = (
  props,
): React.JSX.Element => {
  const { products, getProducts } = useProductListing();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const renderItemProductList = ({ item }: { item: Product }) => {
    return (
      <Pressable
        style={styles.itemStyle}
        onPress={() => {
          props.navigation.navigate('productDetails', { product: item });
        }}
      >
        <Image
          source={{
            uri: item.image,
          }}
          style={styles.imageStyle}
        />
        <AppText style={styles.titleStyle} numberOfLines={1}>
          {item.title}
        </AppText>
        <AppText style={styles.priceStyle}>{`₹ ${item.price}`}</AppText>
      </Pressable>
    );
  };

  return (
    <View style={styles.containerStyle}>
      <FlatList
        data={products}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        numColumns={2}
        renderItem={renderItemProductList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemStyle: {
    width: '45%',
    margin: 10,
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageStyle: {
    flex: 1,
    height: 100,
    borderRadius: 10,
  },
  titleStyle: {
    fontSize: 16,
    marginTop: 10,
  },
  priceStyle: {
    fontSize: 16,
    marginTop: 10,
  },
});
export default React.memo(ProductListing);
