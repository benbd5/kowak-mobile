import { ScrollView, Skeleton, Text, View } from "native-base";
import React, { useState, useEffect } from "react";
import { showSpecificWorkspace } from "../../services/api";

export default function Show(workSpace) {
  const id = workSpace.route.params

  const [workspace, setWorkspace] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const getData = async () => {
      const response = await showSpecificWorkspace(id)
      await console.log("Show", response);
      await setWorkspace(response);
      await setLoading(false);
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
    <View>
      <ScrollView
        style={{ maxWidth: '100%' }}
        h='100%'
        w='100%'>

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
      </ScrollView>
    </View>
  );
}
