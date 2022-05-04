import React from 'react';
import { View, Text, Button } from 'react-native'
import Workspaces from '../components/Workspaces';
import { logoutUser, useAuth } from './../contexts/AuthContext';

function HomeScreen({ navigation }) {

  const { dispatch } = useAuth()

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Workspaces />
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