import { ScrollView } from "native-base";
import React, { useState, useEffect } from "react";
import { RefreshControl } from 'react-native'
import { getAllWorkspaces, userProfile } from "../services/api";
import Loading from "./Loading";
import BoxWorkspace from "./BoxWorkspace";
import { useFocusEffect } from '@react-navigation/native';

/**
 * 
 * @param {props} cities Liste des villes récupérées depuis la base de données
 * @returns 
 */
function Workspaces({ cities }) {
  const [listWorkspaces, setListWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = React.useState(false)
  const [profile, setProfile] = useState()

  console.log('workspaces', listWorkspaces)
  console.log('cities', cities)

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
    setLoading(false);
  }, [])
  // )

  // useEffect(async () => {
  //   await getData();
  // }, []);

  const getData = async () => {
    const response = await userProfile()
    await setProfile(response);
    // const workspaces = await getAllWorkspaces()
    // await setListWorkspaces(workspaces);
    await setLoading(false);
    // return workspaces
  }

  // Lors du refresh, on affiche l'animation de refresh, et on rappelle l'api
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true)
    await getData().then(() => setRefreshing(false))
  }, [])

  useEffect(async () => {
    await getData()
    if (cities.length > 0) {
      await setListWorkspaces(cities);
      await setLoading(false);
    }
  }, [cities])

  // Skeleton au chargement
  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >

      {/* Espaces de travail */}
      {listWorkspaces.map((item) => (
        <BoxWorkspace key={item.id} workspace={item} favorites={profile} />
      ))
      }
    </ScrollView>
  );
}

export default Workspaces;