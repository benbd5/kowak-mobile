import { useFocusEffect } from '@react-navigation/native';
import { Center, Heading, NativeBaseProvider, Skeleton, VStack } from 'native-base';
import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native'
import { logoutUser, useAuth } from '../contexts/AuthContext';
import { userProfile } from '../services/api';
import ToggleDarkMode from './../components/Theme/ToggleDarkMode';

function AccountScreen({ navigation }) {
  const [profile, setProfile] = useState()
  const [loading, setLoading] = useState(true);

  const { dispatch } = useAuth()

  const getData = async () => {
    const response = await userProfile()
    await console.log("userProfile", response);
    await setProfile(response);
    await setLoading(false);
    await console.log("profile", profile);
    await console.log('profile.user.original.favorites', profile.user.original.favorites);
  }

  // Permet de récupérer les données de l'utilisateur connecté à chaque fois que l'on se rend sur la page Account
  useFocusEffect(
    React.useCallback(() => {
      const fetchUser = async () => {
        try {
          await getData()
        } catch (error) {
          console.log('error', error);
        }
      }
      fetchUser()
    }, [])
  )

  useEffect(async () => {
    await getData();
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
      <Heading size="lg">
        Profile
      </Heading>
      <Text>
        {profile.item.firstName}
      </Text>
      <Text>
        {profile.item.lastName}
      </Text>
      <Text>
        {profile.item.email}
      </Text>
      <Text>
        {profile.item.phone}
      </Text>

      <Text>
        Les espaces de travail que vous metter à disposition :
      </Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>
          {profile.item.work_space_appartenir.length > 0 ? profile.item.work_space_appartenir.map(workSpace => {
            return (
              <View key={workSpace.workSpaceId} style={{ justifyContent: 'space-between' }}>
                <Button title={workSpace.adress} onPress={() => navigation.navigate('Show', workSpace.workSpaceId)} />
              </View>
            )
          }) : <Text>Vous n'avez pas encore loué d'espace de travail</Text>}
        </Text>
      </View>

      <Text>
        Vos favoris
      </Text>
      {
        profile.user.original.favorites.length > 0 ?
          profile.user.original.favorites.map(favorite =>
            <Text key={favorite.id}>
              {favorite.name}
            </Text>
          ) : <Text>
            Aucun favoris
          </Text>
      }
      <ToggleDarkMode />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button title="Logout" onPress={() => logoutUser(dispatch)} />
    </View >
  );
}

export default AccountScreen