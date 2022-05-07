import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Text, View } from 'native-base';
import { userProfile } from '../services/api';
import Loading from '../components/Loading';
import BoxWorkspace from '../components/BoxWorkspace';

export default function Favorites() {
  const [profile, setProfile] = useState()
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const response = await userProfile()
    await setProfile(response);
    await setLoading(false);
  }

  // Permet de récupérer les données de l'utilisateur connecté à chaque fois que l'on se rend sur la page Account
  useFocusEffect(
    React.useCallback(() => {
      const fetchUser = async () => {
        try {
          await getData()
        } catch (error) {
          return (
            <Text>Veuillez réessayer dans quelques minutes</Text>
          )
          console.log('error', error);
        }
      }
      fetchUser()
    }, [])
  )

  // useEffect(async () => {
  //   await getData();
  // }, []);

  console.log('favorites', profile)

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {
        profile.user.original.favorites.length > 0 ?
          profile.user.original.favorites.map(favorite => {
            return (
              <BoxWorkspace key={favorite.id} workspace={favorite} />
            )
          }
          ) :
          <Text>Aucun favoris</Text>
      }
    </View>
  )
}