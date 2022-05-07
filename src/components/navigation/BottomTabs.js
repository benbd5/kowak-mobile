import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import HomeScreen from '../../screens/Home'
import AccountScreen from '../../screens/Account'
import PostWorkspace from '../../screens/workspaces/Post'
import Favorites from '../../screens/Favorites'

const Tab = createBottomTabNavigator();

function BottomTabs() {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Explorer':
              iconName = focused
                ? 'home-search'
                : 'home-search-outline';
              break;
            case 'Profile':
              iconName = focused
                ? 'account'
                : 'account-outline';
              break;
            case 'Favoris':
              iconName = focused
                ? 'heart'
                : 'heart-outline';
              break;
            case 'Publier':
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
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Explorer" component={HomeScreen} options={{
        headerShown: false
      }}
      />
      <Tab.Screen name="Favoris" component={Favorites} options={{
        headerTitleStyle: {
          fontSize: 25,
          fontWeight: 'bold',
          marginStart: '10%',
        },
        headerStyle: {
          borderBottomColor: 'yellow',
          borderBottomWidth: 1,
        }
      }}
      />
      <Tab.Screen name="Publier" component={PostWorkspace} options={{
        headerShown: true,
        title: 'Publier',
        headerTitleStyle: {
          fontSize: 25,
          fontWeight: 'bold',
          marginStart: '10%',
        },
        headerStyle: {
          borderBottomColor: 'yellow',
          borderBottomWidth: 1,
        },
      }}
      />
      <Tab.Screen name="Kochat" component={AccountScreen} />
      <Tab.Screen name="Profile" component={AccountScreen} options={{
        headerShown: false
      }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabs