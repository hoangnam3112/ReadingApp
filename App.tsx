import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import LogoScreen from './screens/LogoScreen';
import AdminUserPicker from './screens/loginRegister/AdminUserPicker';
import AdminCode from './screens/loginRegister/AdminCodeScreen';
import AdminRegisterScreen from './screens/loginRegister/AdminRegisterScreen';
import UserRegisterScreen from './screens/loginRegister/UserRegisterScreen';
import LoginScreen from './screens/loginRegister/LoginScreen';
import AddScreen from './screens/adminInterface/AddScreen';
import AdminScreen from './screens/adminInterface/AdminScreen';
import UserScreen from './screens/userInterface/UserScreen';
import LibraryScreen from './screens/userInterface/LibraryScreen';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Logo' component={LogoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AdminUser" component={AdminUserPicker} options={{ headerShown: false }} />
        <Stack.Screen name="AdminCode" component={AdminCode} options={{ headerShown: false }} />
        <Stack.Screen name="UserRegister" component={UserRegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AdminRegister" component={AdminRegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Admin' component={AdminScreen} options={{ headerShown: false }} />
        <Stack.Screen name="User" component={UserScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Addbook' component={AddScreen} options={{ headerTitle: 'Đăng Tải Sách', headerTitleAlign: 'center', }} />
        <Stack.Screen name="Library" component={LibraryScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App