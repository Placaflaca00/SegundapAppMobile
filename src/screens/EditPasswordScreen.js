import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';

const EditPasswordScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { passwordId } = route.params || {};
  const [website, setWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [originalData, setOriginalData] = useState({});

  // Cargar los detalles de la contraseña al montar la pantalla
  useEffect(() => {
    const fetchPasswordDetail = async () => {
      try {
        const userId = auth.currentUser.uid;
        const passwordRef = doc(db, 'users', userId, 'passwords', passwordId);
        const passwordDoc = await getDoc(passwordRef);

        if (passwordDoc.exists()) {
          const data = passwordDoc.data();
          setWebsite(data.sitio_web || '');
          setUsername(data.usuario || '');
          setPassword(data.contraseña || '');
          setOriginalData(data); // Guardar los datos originales
        } else {
          Alert.alert('Error', 'No se encontró la contraseña.');
        }
      } catch (error) {
        console.error('Error al cargar los detalles de la contraseña: ', error);
      }
    };

    fetchPasswordDetail();
  }, [passwordId]);

  const handleSave = async () => {
    // Verificar si hubo cambios
    if (
      website === originalData.sitio_web &&
      username === originalData.usuario &&
      password === originalData.contraseña
    ) {
      Alert.alert('No se realizaron cambios.');
      navigation.goBack(); // Volver atrás si no hubo cambios
      return;
    }

    const userId = auth.currentUser.uid;
    const passwordRef = doc(db, 'users', userId, 'passwords', passwordId);

    await updateDoc(passwordRef, {
      sitio_web: website,
      usuario: username,
      contraseña: password,
      lastModified: new Date(), // Actualiza la fecha de modificación
    });
    Alert.alert('Cambios guardados correctamente.');
    navigation.goBack();
  };

  // Función para el botón de eliminar (aún no funcional)
  const handleDelete = () => {
    Alert.alert('Eliminar', 'Esta función aún no está disponible.');
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Sitio Web"
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

      {/* Botón Guardar Cambios */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>GUARDAR CAMBIOS</Text>
      </TouchableOpacity>

      {/* Botón Cancelar */}
      <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>

      {/* Botón de Eliminar */}
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  saveButton: {
    backgroundColor: '#64C466',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#007BFF',
    marginTop: 30,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#FF4444',
    marginTop: 30,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditPasswordScreen;
