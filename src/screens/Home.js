import React from 'react';
import { View, Text, Button } from 'react-native'
import Workspaces from '../components/Workspaces';

function HomeScreen({ navigation }) {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Workspaces />
    </View>
  );
}

export default HomeScreen