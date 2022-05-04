import { Center, Heading, NativeBaseProvider, Skeleton, VStack } from 'native-base';
import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native'
import { useAuth } from '../contexts/AuthContext';
import { userProfile } from '../services/api';
import ToggleDarkMode from './../components/Theme/ToggleDarkMode';

function AccountScreen({ navigation }) {
  const [profile, setProfile] = useState()
  const [loading, setLoading] = useState(true);

  const { dispatch } = useAuth();

  useEffect(() => {
    const getData = async () => {
      const response = await userProfile()
      await console.log("userProfile", response);
      await setProfile(response);
      await setLoading(false);
      await console.log("profile", profile);
    }
    getData();
  }, []);

  if (loading) {
    return (
      <>
        <Skeleton h={130} mb={3} />
        <Skeleton h={130} mb={3} />
        <Skeleton h={130} mb={3} />
        <Skeleton h={130} mb={3} />
      </>
    )
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Center
        _dark={{ bg: 'blueGray.900' }}
        _light={{ bg: 'blueGray.50' }}
        px={4}
        flex={1}>
        <VStack space={5} alignItems="center">
          <Heading size="lg">Kowak</Heading>
          <ToggleDarkMode />
        </VStack>
      </Center>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

export default AccountScreen