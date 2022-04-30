import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import HomeScreen from '../screens/Home'
import AccountScreen from '../screens/Account'
import PostWorkspace from '../screens/workspaces/Post'

const Tab = createBottomTabNavigator();

function BottomTabs() {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Search':
              iconName = focused
                ? 'home-search'
                : 'home-search-outline';
              break;
            case 'Account':
              iconName = focused
                ? 'account'
                : 'account-outline';
              break;
            case 'Favorites':
              iconName = focused
                ? 'heart'
                : 'heart-outline';
              break;
            case 'Add':
              iconName = focused
                ? 'plus-box'
                : 'plus-box-outline';
              break;
            case 'Kochat':
              iconName = focused
                ? 'message'
                : 'message-outline';
              break;

            default:
              break;
          }

          // You can return any component that you like here!
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Search" component={HomeScreen} />
      <Tab.Screen name="Favorites" component={HomeScreen} />
      <Tab.Screen name="Add" component={PostWorkspace} />
      <Tab.Screen name="Kochat" component={AccountScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

export default BottomTabs