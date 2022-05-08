import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { userProfile } from '../services/api';
import { Center, ScrollView, Text } from 'native-base';
import Loading from '../components/Loading';
import BoxWorkspace from '../components/BoxWorkspace';

export default function Ads() {
  const [profile, setProfile] = useState()
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const response = await userProfile()
    await setProfile(response);
    await setLoading(false);
  }

  // Permet de récupérer les données de l'utilisateur connecté à chaque fois que l'on se rend sur la page Account
  // useFocusEffect(
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
  // )

  useEffect(async () => {
    await getData();
  }, []);

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <Center
      style={{
        backgroundColor: '#fff'
      }}>
      <ScrollView>
        {
          profile.item.work_space_appartenir.length > 0 ? profile.item.work_space_appartenir.map(workSpace => {
            return (
              <BoxWorkspace key={workSpace.workspaceId} workspace={workSpace} />
            )
          }) : <Text>Vous n'avez pas encore posté d'annonces</Text>
        }
      </ScrollView>
    </Center>
  )
}