import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import BottomTabBar from '../components/BottomTabBar';

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar..."
          placeholderTextColor="#888"
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Contenido de la pantalla</Text>
      </View>
      
      <BottomTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Ajusta el contenido arriba
    alignItems: 'stretch',
  },
  searchBar: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginHorizontal: 10, // Agrega un margen horizontal
    marginBottom: 10, // Agrega un margen inferior
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  content: {
    flex: 1, // Hace que este contenido ocupe el espacio restante
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10, // Ajustar el margen horizontal para que coincida con el de la barra de búsqueda
  },
  title: {
    fontSize: 24,
  },
});