import { Link, List, Skeleton, Text, View, TouchableOpacity, ScrollView, Button } from "native-base";
import React, { useState, useEffect } from "react";
import { RefreshControl } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { getAllWorkspaces } from "../services/api";

/**
 * 
 * @param {props} cities Liste des villes récupérées depuis la base de données
 * @returns 
 */
function Workspaces({ cities }) {
  const navigation = useNavigation();

  const [listWorkspaces, setListWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = React.useState(false)

  const getData = async () => {
    const workspaces = await getAllWorkspaces()
    await setListWorkspaces(workspaces);
    await setLoading(false);
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
      <>
        <Skeleton h={130} mb={3} />
        <Skeleton h={130} mb={3} />
        <Skeleton h={130} mb={3} />
        <Skeleton h={130} mb={3} />
        <Skeleton h={130} mb={3} />
      </>
    )
  }


  return (
    <ScrollView
      style={{ maxWidth: '100%' }}
      h='100%'
      w='100%'
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>

      <Text>Tous les espaces de travail</Text>

      {/* Espaces de travail */}
      {listWorkspaces.map((item) => (
        <List key={item.workSpaceId}>
          <Text>{item.name}</Text>
          <Text>Description :{item.description}</Text>
          <Text>Région : {item.region}</Text>
          <Text>Ville : {item.city}</Text>
          <Text>Adresse : {item.address}</Text>
          <Text>Code postal : {item.zipCode}</Text>
          <Text>Latitude : {item.latitude}</Text>
          <Text>Longitude : {item.longitude}</Text>
          <Text>Département : {item.departement}</Text>
          <Text>
            Surface : {item.surface}m²</Text>
          <Text>
            Nombre de bureaux : {item.desk}
          </Text>
          <Text>
            Nombre d'écrans : {item.computerScreen}
          </Text>
          <Text>
            Nombre de projecteurs : {item.projector}
          </Text>
          <Text>
            Parking :
            {item.parking == 1 ? ' Oui' : ' Non'}
          </Text>
          <Text>
            Accès personnes handicapées :
            {item.handicappedPersonsAccess == 1 ? ' Oui' : ' Non'}
          </Text>
          <Button onPress={() => navigation.navigate('Show', item.workSpaceId)}>
            Voir
          </Button>
        </List>
      ))
      }
    </ScrollView>
  );
}

export default Workspaces;