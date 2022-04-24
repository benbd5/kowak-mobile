import React from 'react';
import { View, Text, Button } from 'react-native'

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Account"
        onPress={() => navigation.navigate('Account')}
      />
    </View>
  );
}

export default HomeScreen