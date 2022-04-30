import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import BottomTabs from '../navigation/BottomTabs';
import { useAuth } from '../../contexts/AuthContext';

const AuthNavigator = createNativeStackNavigator()

const AuthRoutes = () => (
  <AuthNavigator.Navigator
    initialRouteName='Login'
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' }
    }}
  >
    <AuthNavigator.Screen name="Login" component={LoginScreen} />
    <AuthNavigator.Screen name="Register" component={RegisterScreen} />
  </AuthNavigator.Navigator>
)

function AuthenticatedRoutes() {
  const { state } = useAuth();
  // console.log('user', state)
  if (state.user) {
    return <BottomTabs />
  }
  return <AuthRoutes />
}

export default AuthenticatedRoutes