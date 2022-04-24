import { Center, Heading, NativeBaseProvider, VStack } from 'native-base';
import React from 'react';
import { View, Text, Button } from 'react-native'
import NativeBaseIcon from '../NativeBaseIcon';
import ToggleDarkMode from '../Theme/ToggleDarkMode';

function AccountScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <NativeBaseProvider>
        <Center
          _dark={{ bg: 'blueGray.900' }}
          _light={{ bg: 'blueGray.50' }}
          px={4}
          flex={1}>
          <VStack space={5} alignItems="center">
            <NativeBaseIcon />
            <Heading size="lg">Kowak</Heading>
            <ToggleDarkMode />
          </VStack>
        </Center>
      </NativeBaseProvider>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

export default AccountScreen