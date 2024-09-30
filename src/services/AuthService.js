import { auth, db } from '../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { doc, setDoc, collection, addDoc, getDocs, query } from 'firebase/firestore';

// Registro de usuario
export const registerUser = async (email, password, name, apellido) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userId = userCredential.user.uid;

    // Crear un documento para el usuario en Firestore
    await setDoc(doc(db, 'users', userId), {
      email: email,
      nombre: name,
      apellido: apellido,
      createdAt: new Date(),
    });

    console.log('Usuario registrado y datos guardados en Firestore');
  } catch (error) {
    console.error('Error al registrar el usuario:', error.message);
    throw error;
  }
};

// Guardar contraseñas en la subcolección 'passwords'
export const savePassword = async (userId, passwordData) => {
  try {
    await addDoc(collection(db, 'users', userId, 'passwords'), passwordData);
    console.log('Contraseña guardada correctamente');
  } catch (error) {
    console.error('Error al guardar la contraseña:', error.message);
    throw error;
  }
};

// Obtener contraseñas
export const getPasswords = async (userId) => {
  try {
    const passwordsQuery = query(collection(db, 'users', userId, 'passwords'));
    const querySnapshot = await getDocs(passwordsQuery);
    const passwords = querySnapshot.docs.map(doc => doc.data());
    return passwords;
  } catch (error) {
    console.error('Error al obtener las contraseñas:', error.message);
    throw error;
  }
};

// Iniciar sesión
export const loginUser = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log('Usuario ha iniciado sesión');
  } catch (error) {
    if (error.code === 'auth/wrong-password') {
      console.error('Contraseña incorrecta');
    } else if (error.code === 'auth/user-not-found') {
      console.error('Usuario no encontrado');
    } else {
      console.error('Error al iniciar sesión:', error.message);
    }
    throw error;
  }
};

// Cerrar sesión
export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log('Usuario ha cerrado sesión');
  } catch (error) {
    console.error('Error al cerrar sesión: ', error);
    throw error;
  }
};

// Restablecer contraseña
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log('Correo de restablecimiento de contraseña enviado');
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      console.error('Usuario no encontrado');
    } else {
      console.error('Error al enviar el correo:', error.message);
    }
    throw error;
  }
};

// Estado de autenticación
export const onAuthStateChanged = (callback) => {
  return firebaseOnAuthStateChanged(auth, callback);
};
//jjj