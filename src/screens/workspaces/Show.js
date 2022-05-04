import { Button, ScrollView, Skeleton, Text, View } from "native-base";
import React, { useState, useEffect } from "react";
import { likeWorkspace, showSpecificWorkspace } from "../../services/api";
import Map from "../../components/Map";

export default function Show(workSpace) {
  const id = workSpace.route.params

  const [workspace, setWorkspace] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState(false)
  const [message, setMessage] = useState('')
  const [coordinate, setCoordinate] = useState({
    latitude: 0,
    longitude: 0
  })

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

  const addToFavorite = async () => {
    await likeWorkspace(id)
    if (favorite) {
      setFavorite(false)
      setMessage('Removed from favorite')
    }
    else {
      setFavorite(true)
      setMessage('Added to favorite')
    }
  }

  // when favorite is true, display a message during 3 seconds and then remove it from the screen
  useEffect(() => {
    if (favorite) {
      setTimeout(() => {
        setMessage('')
      }, 3000)
    }
  }, [favorite])

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
    <View>
      <ScrollView
        style={{ maxWidth: '100%' }}
        h='100%'
        w='100%'>

        {/* Message ajouter/retirer en favoris */}
        {favorite ?
          <Text style={{ fontSize: 20, color: '#ff0000' }}>
            {message}
          </Text>
          :
          <Text style={{ fontSize: 20, color: '#ff0000' }}>
            {message}
          </Text>
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
        <Button onPress={addToFavorite}>
          {favorite ? 'Retirer de mes favoris' : 'Ajouter à mes favoris'}
        </Button>

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
