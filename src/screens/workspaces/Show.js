import { ScrollView, Text, View } from "native-base";
import React, { useState, useEffect } from "react";
import { likeWorkspace, showSpecificWorkspace } from "../../services/api";
import Map from "../../components/Map";
import Loading from "../../components/Loading";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function Show(workSpace, { favorites }) {
  console.log("favorites", favorites);
  const id = workSpace.route.params

  const [workspace, setWorkspace] = useState([]);
  const [loading, setLoading] = useState(true);
  const [coordinate, setCoordinate] = useState({
    latitude: 0,
    longitude: 0
  })

  // Check if the workspace is already in the favorite list of the current user
  // const isFavorite = favorites.user.original.favorites.find(favorite => favorite.workSpaceId === workspace.workSpaceId);
  const [favorite, setFavorite] = useState(favorites);
  // const [favorite, setFavorite] = useState('');

  useEffect(() => {
    const getData = async () => {
      const response = await showSpecificWorkspace(id)
      console.log("Show", response);
      setWorkspace(response);
      setCoordinate({
        latitude: Number(response.latitude),
        longitude: (response.longitude)
      })
      setLoading(false);
    }
    getData();
  }, []);

  // Add to favorite
  const addToFavorite = async () => {
    await likeWorkspace(workspace.workSpaceId)
    if (favorite) {
      setFavorite(false)
    }
    else {
      setFavorite(true)
    }
  }

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <View>
      <ScrollView
        style={{ maxWidth: '100%' }}
        h='100%'
        w='100%'>

        {
          favorite ?
            <MaterialCommunityIcons name='heart' size={30} color='#2563eb' onPress={addToFavorite} />
            :
            <MaterialCommunityIcons name='heart-outline' size={30} color='#2563eb' onPress={addToFavorite} />
        }

        <Text>{workspace?.name}</Text>
        <Text>Description :{workspace?.description}</Text>
        <Text>Région : {workspace?.region}</Text>
        <Text>Ville : {workspace?.city}</Text>
        <Text>Adresse : {workspace?.address}</Text>
        <Text>Code postal : {workspace?.zipCode}</Text>
        <Text>Département : {workspace?.departement}</Text>
        <Text>
          Surface : {workspace?.surface}m²</Text>
        <Text>
          Nombre de bureaux : {workspace?.desk}
        </Text>
        <Text>
          Nombre d'écrans : {workspace?.computerScreen}
        </Text>
        <Text>
          Nombre de projecteurs : {workspace?.projector}
        </Text>
        <Text>
          Parking :
          {workspace?.parking == 1 ? ' Oui' : ' Non'}
        </Text>
        <Text>
          Accès personnes handicapées :
          {workspace?.handicappedPersonsAccess == 1 ? ' Oui' : ' Non'}
        </Text>

        {coordinate.latitude !== 0 && coordinate.longitude !== 0 ?
          <Map
            coordinate={coordinate}
          />
          :
          <Text>Aucune coordonnées</Text>
        }
      </ScrollView>
    </View>
  );
}
