// src/screens/HomeScreen.js
import React from 'react';
import {
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const categories = [
    { name: 'Todas', icon: require('../assets/icons/all.png') },
    { name: 'Llaves', icon: require('../assets/icons/keys.png') },
    { name: 'Códigos', icon: require('../assets/icons/codes.png') },
    { name: 'Wi-Fi', icon: require('../assets/icons/wifi.png') },
    { name: 'Seguridad', icon: require('../assets/icons/security.png') },
    { name: 'Eliminadas', icon: require('../assets/icons/deleted.png') },
  ];

  const handleCategoryPress = (category) => {
    navigation.navigate('PasswordsList', { category });
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <TextInput
        placeholder="Buscar"
        style={styles.searchBar}
        placeholderTextColor="#999"
      />
      <View style={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={styles.categoryButton}
            onPress={() => handleCategoryPress(category.name)}
          >
            <View style={styles.categoryIconContainer}>
              <Image source={category.icon} style={styles.categoryIcon} />
            </View>
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.sharedSection}>
        <Text style={styles.sectionTitle}>Grupos Compartidos</Text>
        <TouchableOpacity style={styles.newGroupButton}>
          <Text style={styles.newGroupButtonText}>Crear Nuevo Grupo</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.shareFamilyButton}>
        <Text style={styles.shareFamilyText}>Compartir con Familia</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  searchBar: {
    height: 50,
    margin: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  categoryButton: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 30,
  },
  categoryIconContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 50,
    padding: 15,
    marginBottom: 10,
  },
  categoryIcon: { width: 40, height: 40 },
  categoryText: { fontSize: 14, color: '#333', textAlign: 'center' },
  sharedSection: { paddingHorizontal: 20, marginTop: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  newGroupButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  newGroupButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  shareFamilyButton: {
    marginTop: 30,
    marginHorizontal: 20,
    backgroundColor: '#28A745',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  shareFamilyText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default HomeScreen;
