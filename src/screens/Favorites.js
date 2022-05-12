import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, Text, View } from 'native-base';
import { userProfile } from '../services/api';
import Loading from '../components/Loading';
import BoxWorkspace from '../components/BoxWorkspace';
import { RefreshControl } from 'react-native'

export default function Favorites() {
  const [profile, setProfile] = useState()
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false)

  const getData = async () => {
    const response = await userProfile()
    await setProfile(response);
    await setLoading(false);
  }

  // Permet de récupérer les données de l'utilisateur connecté à chaque fois que l'on se rend sur la page Account
  // useFocusEffect(
  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    fetchUser().then(() => setRefreshing(false))
  }, [])
  // )

  const fetchUser = async () => {
    try {
      await getData()
      setLoading(false)
    } catch (error) {
      console.log('error', error);
      return (
        <Text>Veuillez réessayer dans quelques minutes</Text>
      )
    }
  }

  useEffect(async () => {
    await getData();
  }, []);

  // console.log('favorites', profile)

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
      <ScrollView
        style={{ maxWidth: '100%' }}
        h='100%'
        w='90%'
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        {
          profile.user.original.favorites.length > 0 ?
            profile.user.original.favorites.map(favorite => {
              return (
                <BoxWorkspace key={favorite.id} workspace={favorite} favorites={favorite} />
              )
            }
            ) :
            <Text>Aucun favoris</Text>
        }
      </ScrollView >
    </View>
  )
}