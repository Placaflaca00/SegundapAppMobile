import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import PasswordsListScreen from '../screens/PasswordsListScreen';
import PasswordDetailScreen from '../screens/PasswordDetailScreen';
import AddPasswordScreen from '../screens/AddPasswordScreen'; 
import EditPasswordScreen from '../screens/EditPasswordScreen'; 

const Stack = createStackNavigator();

const AppNavigator = ({ user }) => {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
    {user ? (
      <React.Fragment>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PasswordsList" component={PasswordsListScreen} />
        <Stack.Screen name="PasswordDetail" component={PasswordDetailScreen} />
        <Stack.Screen name="AddPassword" component={AddPasswordScreen} />
        <Stack.Screen name="EditPassword" component={EditPasswordScreen} />
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      </React.Fragment>
    )}
  </Stack.Navigator>
  );
};

export default AppNavigator;
