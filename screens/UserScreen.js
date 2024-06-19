import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { View, Text, StyleSheet, Button } from 'react-native';
import BottomTabBar from '../components/BottomTabBar';

export default function UserScreen() {

  const { logout } = useContext(AuthContext)

  return (
    <View style={styles.container}>
      <Text style={styles.title}></Text>
      <Button title="Favoritos" onPress={() => navigation.navigate('Fav')}/>
      <Button title="Carrito de compra" onPress={() => navigation.navigate('ShopKart')} />
      <Button title="Salir" onPress={ () => logout()} color="red" />
      <BottomTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
  },
});
