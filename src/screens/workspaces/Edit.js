import React from "react";
import { Text, View, TextInput, Button, Alert } from "react-native";
import { Checkbox, FlatList, FormControl, Input, List, TextArea } from "native-base";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useState, useEffect } from "react";
import { updateWorkspace } from "../../services/api";
import { useNavigation } from "@react-navigation/native";

/**
 * 
 * @param {Object} workspaceProps Annonce à modifier provenant des paramètres de la route 
 * @returns 
 */
export default function App(workspaceProps) {
  const [adress, setAdress] = useState('');
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [displaySuggestions, setDisplaySuggestions] = useState(false);

  const navigation = useNavigation()

  const workspaceToEdit = workspaceProps.route.params.workspace;

  const [workspace, setWorkspace] = useState({
    surface: workspaceToEdit.surface,
    name: workspaceToEdit.name,
    kitchen: workspaceToEdit.kitchen == 1 ? true : false,
    parking: workspaceToEdit.parking == 1 ? true : false,
    computerScreen: workspaceToEdit.computerScreen,
    handicappedPersonsAccess: workspaceToEdit.handicappedPersonsAccess == 1 ? true : false,
    desk: workspaceToEdit.desk,
    projector: workspaceToEdit.projector == 1 ? true : false,
    description: workspaceToEdit.description,
    adress: workspaceToEdit.adress,
    city: workspaceToEdit.city,
    zipCode: workspaceToEdit.zipCode,
    departement: workspaceToEdit.departement,
    region: workspaceToEdit.region,
    latitude: workspaceToEdit.latitude,
    longitude: workspaceToEdit.longitude,
  });

  const onSubmit = () => {
    console.log("workspace", workspace);
    updateWorkspace(workspace, workspaceToEdit.workSpaceId);
    navigation.navigate('Validated', 'Votre annonce a bien été modifiée !')
  }

  // Api adresses
  useEffect(() => {
    const getAdress = async () => {
      var axios = require('axios');
      axios
        .get(`https://api-adresse.data.gouv.fr/search/?q=${adress}&type=housenumber&autocomplete=1`)
        .then(function (response) {
          console.log('response api adresse', response.data);
          setDisplaySuggestions(true);
          setAddressSuggestions(response.data.features);
          console.log('addressSuggestions', addressSuggestions);
        })
        .catch(function (error) {
          console.log('error api adresse', error);
        });
    }
    getAdress();
  }, [adress])

  return (
    <KeyboardAwareScrollView>
      <View>
        <FormControl.Label>Surface</FormControl.Label>
        <TextInput
          keyboardType="numeric"
          onChangeText={value => setWorkspace({ ...workspace, surface: value })}
          value={workspace.surface} />

        <FormControl.Label>Quelles sont les caractéristiques de votre espace ?</FormControl.Label>
        <FormControl.Label>Cuisine</FormControl.Label>

        <Checkbox
          isChecked={workspace.kitchen}
          value={workspace.kitchen}
          onChange={() => setWorkspace({ ...workspace, kitchen: !workspace.kitchen })} />

        <FormControl.Label>Parking</FormControl.Label>

        <Checkbox
          isChecked={workspace.parking}
          value={workspace.parking}
          onChange={() => setWorkspace({ ...workspace, parking: !workspace.parking })} />

        <FormControl.Label>Projecteur</FormControl.Label>
        <Checkbox
          isChecked={workspace.projector}
          value={workspace.projector}
          onChange={() => setWorkspace({ ...workspace, projector: !workspace.projector })} />

        <FormControl.Label>Accès PMR</FormControl.Label>

        <Checkbox
          isChecked={workspace.handicappedPersonsAccess}
          value={workspace.handicappedPersonsAccess}
          onChange={() => setWorkspace({ ...workspace, handicappedPersonsAccess: !workspace.handicappedPersonsAccess })} />

        <FormControl.Label>Nombre d'écrans</FormControl.Label>
        <Input
          keyboardType="numeric"
          onChangeText={value => setWorkspace({ ...workspace, computerScreen: value })}
          value={workspace.computerScreen.toString()} />

        <FormControl.Label>Nombre de bureaux</FormControl.Label>
        <Input
          keyboardType="numeric"
          onChangeText={value => setWorkspace({ ...workspace, desk: value })}
          value={workspace.desk.toString()} />

        <FormControl.Label>Ajouter une description à votre annonce</FormControl.Label>
        <TextArea
          placeholder="Description de l'annonce"
          onChangeText={value => setWorkspace({ ...workspace, description: value })}
          value={workspace.description} />

        <FormControl.Label>Adresse</FormControl.Label>
        <Input
          placeholder="Numéro et nom de rue"

          onChangeText={(text) => setAdress(text)}
          value={workspace.adress} />

        {displaySuggestions && (
          <FlatList
            data={addressSuggestions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Text
                style={{
                  padding: 10,
                  fontSize: 12,
                  height: 44,
                  borderBottomWidth: 1,
                  borderBottomColor: '#ccc',
                  backgroundColor: '#fff',
                  color: '#000',
                }}
                title={item.properties.label}
                onPress={() => {
                  setAdress(item.properties.label)
                  setWorkspace(workspace => ({
                    ...workspace,
                    adress: item.properties.label,
                    zipCode: item.properties.postcode,
                    city: item.properties.city,
                    departement: item.properties.context.split(',')[1],
                    region: item.properties.context.split(',')[2],
                    longitude: item.geometry.coordinates[0],
                    latitude: item.geometry.coordinates[1],
                  }))
                  setDisplaySuggestions(false)
                }}>
                {item.properties.label}
              </Text>
            )}
          />
        )}

        <FormControl.Label>Code postal</FormControl.Label>
        <Input
          keyboardType="numeric"
          placeholder="44000"
          onChangeText={value => setWorkspace({ ...workspace, zipCode: value })}
          value={workspace.zipCode} />
        <FormControl.Label>Département</FormControl.Label>
        <Input
          placeholder="Vendée"
          onChangeText={value => setWorkspace({ ...workspace, departement: value })}
          value={workspace.departement} />

        <FormControl.Label>Région</FormControl.Label>
        <Input
          placeholder="Pays-de-la-Loire"
          onChangeText={value => setWorkspace({ ...workspace, region: value })}
          value={workspace.region} />

        <FormControl.Label>Ville</FormControl.Label>
        <Input
          placeholder="La Roche-Sur-Yon"
          onChangeText={value => setWorkspace({ ...workspace, city: value })}
          value={workspace.city} />

        <Button title="Modifier" onPress={onSubmit} />
      </View>
    </KeyboardAwareScrollView >
  );
}
