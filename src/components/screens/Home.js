import React from 'react';
import { View, Text, Button } from 'react-native'
import { logoutUser, useAuth } from '../../contexts/AuthContext';
import { logout, userProfile } from '../../services/api';

function HomeScreen({ navigation }) {
  console.log('profile', userProfile());
  const { dispatch } = useAuth()

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Account"
        onPress={() => navigation.navigate('Account')}
      />
      <Button onPress={() => logoutUser(dispatch)}
        title="Logout">
      </Button>
    </View>
  );
}

export default HomeScreen