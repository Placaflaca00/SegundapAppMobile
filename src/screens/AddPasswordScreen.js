import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { savePassword } from '../services/AuthService';
import { auth } from '../firebaseConfig'; // Importamos auth para obtener el userId

// Función para generar una contraseña fuerte
const generateStrongPassword = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
  let password = '';
  for (let i = 0; i < 12; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }
  return password;
};

const AddPasswordScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(generateStrongPassword()); // Contraseña fuerte generada automáticamente
  const [website, setWebsite] = useState('');

  // Función para manejar el guardado de la contraseña
  const handleSave = async () => {
    if (!username || !password || !website) {
      Alert.alert('Error', 'Por favor complete todos los campos.');
      return;
    }

    try {
      const userId = auth.currentUser.uid; // Obtener el ID del usuario autenticado
      const passwordData = {
        usuario: username,
        contraseña: password,
        sitio_web: website,
        createdAt: new Date(),
      };

      await savePassword(userId, passwordData);
      Alert.alert('Éxito', 'La contraseña ha sido guardada exitosamente.');
      navigation.goBack(); // Regresar a la pantalla anterior
    } catch (error) {
      console.error('Error al guardar la contraseña', error);
      Alert.alert('Error', 'Hubo un problema al guardar la contraseña.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nueva Contraseña</Text>
      <TextInput
        placeholder="Sitio Web o Etiqueta"
        style={styles.input}
        value={website}
        onChangeText={setWebsite}
      />
      <TextInput
        placeholder="Nombre de Usuario"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Guardar Contraseña</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 2,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddPasswordScreen;
