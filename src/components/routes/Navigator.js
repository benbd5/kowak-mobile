import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../screens/Login';
import RegisterScreen from '../../screens/Register';
import Show from '../../screens/workspaces/Show';
import BottomTabs from '../navigation/BottomTabs';
import { useAuth } from '../../contexts/AuthContext';
import Ads from '../../screens/Ads';
import ShowUserProfile from '../../screens/ShowUserProfile';

const AuthNavigator = createNativeStackNavigator()

const AuthRoutes = () => (
  <AuthNavigator.Navigator
    initialRouteName='Login'
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#fff' }
    }}
  >
    <AuthNavigator.Screen name="Login" component={LoginScreen} />
    <AuthNavigator.Screen name="Register" component={RegisterScreen} />
  </AuthNavigator.Navigator>
)

// navigator for the workspaces screen
const WorkspacesNavigator = createNativeStackNavigator()
const WorkspacesRoutes = () => (
  <WorkspacesNavigator.Navigator
    initialRouteName='Workspaces'
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#fff' }
    }}
  >
    <WorkspacesNavigator.Screen name="Workspaces" component={BottomTabs} />
    <WorkspacesNavigator.Screen name="Show" component={Show} options={{
      headerShown: true
    }} />
    <WorkspacesNavigator.Screen name="Mes annonces" component={Ads} options={{
      headerShown: true
    }} />
    <WorkspacesNavigator.Screen name="Profile du loueur" component={ShowUserProfile} options={{
      headerShown: true
    }} />
  </WorkspacesNavigator.Navigator>
)

function AuthenticatedRoutes() {
  const { state } = useAuth();
  // console.log('user', state)
  if (state.user) {
    return (
      <WorkspacesRoutes />
    )
  }
  return <AuthRoutes />
}

export default AuthenticatedRoutes