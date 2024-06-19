import React, { useContext, useEffect } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ProductContext } from '../context/ProductContext';
import SneakerCard from '../components/SneakerCard';
import BottomTabBar from '../components/BottomTabBar';

export default function HomeScreen() {

  const { products, loadProducts } = useContext(ProductContext);
  const navigation = useNavigation();

  useEffect(() => {
    console.log(products)
  }, [])
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <SneakerCard
            sneaker={item}
            onPress={() => navigation.navigate('Product', { productId: item._id })}
          />
        )}
        contentContainerStyle={styles.list}
      />
      <BottomTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  list: {
    paddingHorizontal: 10,
  },
});